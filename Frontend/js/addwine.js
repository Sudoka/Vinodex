// Generated by IcedCoffeeScript 1.4.0c
(function() {
  var iced, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {

      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) return this.continuation(this.ret);
      };

      _Class.prototype.defer = function(defer_params) {
        var _this = this;
        ++this.count;
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  $(function() {
    var cellars, html, loadWineDataIntoUI, wine, wineId, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    loadWineDataIntoUI = function(wine) {
      $("#winename").val(wine.name);
      $("#year").val(wine.vintage);
      $("#alcoholcontent").val(wine.alcohol_content);
      $("#winetype").val(wine.wine_type);
      $("#wineryname").val(wine.winery.name);
      $("#retailprice").val(wine.retail_price);
      $("#winenamelabel").append(wine.name);
      return JSONParser(JSON.parse(wine.raw_data));
    };
    $("#valaddwine").click(function(event) {
      var alcohol, bottle, bottles, cellar, name, nothing, price, type, wine, wineObj, winery, wineryObj, year, ___iced_passed_deferral1, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral1 = iced.findDeferral(arguments);
      $("#addwine").valreset();
      event.preventDefault();
      name = $("#winename").vallength();
      year = $("#year").valvintageyear();
      alcohol = $("#alcoholcontent").vallength();
      cellar = $("#cellar").valselect();
      type = $("#winetype").valselect();
      bottles = $("#numbottles").vallength();
      winery = $("#wineryname").val();
      price = $("#retailprice").val();
      if (!name || !year || !alcohol || !cellar || !type || !bottles) {
        console.log("Error Condition");
        return;
      }
      wine = {
        name: name,
        vintage: year,
        alcohol_content: alcohol,
        wine_type: type,
        retail_price: (parseFloat(price)) || 0
      };
      (function(__iced_k) {
        if (winery) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral1,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
            });
            backend.Winery.getOrCreate({
              name: winery
            }, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return wineryObj = arguments[0];
                };
              })(),
              lineno: 41
            }));
            __iced_deferrals._fulfill();
          })(function() {
            return __iced_k(wine.winery = {
              id: wineryObj.id
            });
          });
        } else {
          return __iced_k();
        }
      })(function() {
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral1,
            filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
          });
          backend.Wine.getOrCreate(wine, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return wineObj = arguments[0];
              };
            })(),
            lineno: 46
          }));
          __iced_deferrals._fulfill();
        })(function() {
          bottle = {
            wine: {
              id: wineObj.id
            },
            cellar: {
              id: parseInt(cellar)
            },
            num_bottles: bottles
          };
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral1,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
            });
            backend.Bottle.create(bottle, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return nothing = arguments[0];
                };
              })(),
              lineno: 55
            }));
            __iced_deferrals._fulfill();
          })(function() {
            return window.location = "/collection.html";
          });
        });
      });
    });
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
      });
      window.backend.Cellar.get({
        owner: window.backend.userId
      }, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return cellars = arguments[0];
          };
        })(),
        lineno: 60
      }));
      __iced_deferrals._fulfill();
    })(function() {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
        });
        frontend.renderTemplate("addwine_cellars", {
          cellars: cellars
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return html = arguments[0];
            };
          })(),
          lineno: 61
        }));
        __iced_deferrals._fulfill();
      })(function() {
        $("#cellar").html(html);
        wineId = parseInt(window.location.hash.substr(1));
        if (wineId) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
            });
            backend.Wine.getById(wineId, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return wine = arguments[0];
                };
              })(),
              lineno: 66
            }));
            __iced_deferrals._fulfill();
          })(function() {
            return __iced_k(loadWineDataIntoUI(wine));
          });
        } else {
          return __iced_k($("#winename").val(window.location.hash.substr(1)));
        }
      });
    });
  });

}).call(this);
