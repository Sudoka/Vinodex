class Resource
  constructor : (@api_endpoint_url, @backend) ->

  # TODO: Handle error conditions

  getById: (id, callback) ->
    await backend.get "#{@api_endpoint_url}#{id}/", defer response
    callback response

  getByIds: (ids, callback) ->
    await backend.get "#{@api_endpoint_url}set/#{ids}/", defer response
    callback response.objects

  get: (filters = {}, callback) ->
    await backend.get @api_endpoint_url, filters, defer response
    callback(response.objects)

  delete: (id, callback) ->
    backend.delete "#{@api_endpoint_url}#{id}/", callback

  create: (object = {}, callback) ->
    await backend.post @api_endpoint_url, object, defer response
    callback response.responseJSON

  update: (id, options, callback) ->
    backend.put("#{@api_endpoint_url}#{id}/", options, callback)

  getOrCreate: (options, callback) ->
    await @get options, defer response
    if response.length
      callback response[0]
    else
      await @create options, defer response
      callback response

class Backend
  constructor : (@serverUrl) ->
    @Bottle = new Resource("/api/v1/bottle/")
    @Cellar = new Resource("/api/v1/cellar/")
    @Winery = new Resource("/api/v1/winery/")
    @Wine = new Resource("/api/v1/wine/")
    @Annotation = new Resource("/api/v1/annotation/")
    @Sommelier = new Resource("/api/v1/sommelier/")
    @Profile = new Resource("/api/v1/profile/")
    @User = new Resource("/api/v1/auth/user/")
    @userId = @getUserCookie()
    @profileUri = "/api/v1/profile/#{@userId}/"


  withLogin: (func) ->
    # Redirects the user index if they are not logged in
    # If the user is logged in, the following code is executed
    
    if not @userIsLoggedIn()
      window.location = '/'
    func()

  isGood: (response) ->
    # A response is good if it is a 304 (not modified)
    # or if it is a 2xx response
    response.status == 304  or parseInt(response.status / 100) == 2

  get: (uri, options, callback) ->
    $.get(@serverUrl + uri, options, callback)

  post: (uri, data, callback) ->
    $.ajax
      url: @serverUrl + uri
      contentType: "application/json"
      type: "POST"
      data: JSON.stringify(data)
      dataType: "json"
      processData: false
      complete: callback
      error: callback

  put: (uri, data, callback) ->
    $.ajax
      url: @serverUrl + uri
      contentType: "application/json"
      type: "PUT"
      data: JSON.stringify(data)
      dataType: "json"
      processData: false
      complete: callback

  delete: (uri, callback) ->
    $.ajax
      url: @serverUrl + uri
      type: "DELETE"
      complete: callback
      dataType: "json"

  login : (email, password, success, failure) ->
    account =
      "username": email
      "password": password

    await @post "/api/v1/auth/user/login/", account, defer response

    if @isGood response
      @setUserCookie response.responseJSON.userId
      success response.responseJSON
    else
      failure response

  logout: ->
    @removeUserCookie()

  createUserAccount: (name, email, password, success, failure) ->
  # Creates a user account and registers that account 
  # with the current session
    account =
      "name": name
      "email": email
      "password": password

    await @post "/api/v1/profile/", account, defer response

    if @isGood response
      @setUserCookie response.responseJSON.id
      success response.responseJSON
    else
      failure()

  updateUserAccount: (name, email, password, callback) ->
    account =
      name: name
      email: email
      password: password

    await @put "/api/v1/profile/#{@userId}/", account, defer response
    callback response

  deleteUserAccount: (callback) ->
    await @Profile.getById @userId, defer profile
    await @User.delete profile.user.id, defer nothing
    @removeUserCookie()
    callback()


  setUserCookie: (userId) ->
    $.cookie("userId", userId)

  getUserCookie: ->
    parseInt($.cookie "userId")

  removeUserCookie: ->
    $.removeCookie "userId"

  userIsLoggedIn: ->
    !!($.cookie "userId")

  postFile: (url, formData, callback) ->
    $.ajax
      url: @serverUrl + url
      type: "POST"
      data: formData
      cache: false
      contentType: false
      processData: false
      complete: callback

  identifyLabel: (formData, callback) ->
    await @postFile "/api/v1/wine/ocr/", formData, defer response
    callback response.responseJSON

  identifyBarcode: (formData, callback) ->
    await @postFile "/api/v1/wine/barcode/", formData, defer response
    callback response.responseJSON

  uploadImage: (formData, bottleId, callback) ->
    await @postFile "/api/v1/wine/image/?bottle_id=#{bottleId}", formData, defer response
    callback response.responseJSON

  sendForgotPasswordEmail: (email, callback) ->
    await $.post "#{@serverUrl}/api/v1/forgotpassword/", {email: email}, defer response
    callback JSON.parse response

  resetPassword: (cipher, password, callback) ->
    await $.post "#{@serverUrl}/api/v1/passwordreset/",
                 {cipher: cipher, password: password},
                 defer response
    callback JSON.parse response

  removeBottles: (bottleId, reason, quantity, callback) ->
    await
      @Annotation.create
        bottle: {id: bottleId}
        key: "Removed Bottles"
        value: "#{reason} #{quantity} bottles", defer nothing
      @Bottle.getById bottleId, defer bottle

    await @Bottle.update bottleId,
      num_bottles: bottle.num_bottles - quantity, defer nothing

    callback()

  getSommelierData: (wineTypes, callback) ->
    await $.get "#{@serverUrl}/api/v1/wine/sommelier/", wine_types: wineTypes, defer response
    callback response


window.Backend = Backend

if not $.cookie "dev"
  window.backend = new Backend("http://www.vinodex.us:8000")
else
  window.backend = new Backend("http://localhost:8000")
