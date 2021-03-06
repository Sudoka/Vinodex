class Frontend
  getHash: ->
    window.location.hash.substr 1

  renderTemplate: (templateName, data, callback) ->
    await $.get "/jst/#{templateName}.jst", defer template
    html = Handlebars.compile(template) data
    callback html

window.frontend = new Frontend
