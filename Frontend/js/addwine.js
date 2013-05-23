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
    var cellars, html, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    $("#valaddwine").click(function(event) {
      var alcohol, bottle, bottles, cellar, matchingWineries, name, nothing, price, type, wine, winery, winery_id, year, ___iced_passed_deferral1, __iced_deferrals, __iced_k,
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
        alcohol: alcohol,
        type: type,
        bottles: 1,
        retail_price: parseFloat(price)
      };
      (function(__iced_k) {
        if (winery) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral1,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
            });
            backend.Winery.get({
              name: winery,
              limit: 1
            }, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return matchingWineries = arguments[0];
                };
              })(),
              lineno: 26
            }));
            __iced_deferrals._fulfill();
          })(function() {
            (function(__iced_k) {
              if (matchingWineries.length) {
                winery_id = matchingWineries[0].id;
                return __iced_k(wine.winery_id = winery_id);
              } else {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral1,
                    filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/addwine.iced"
                  });
                  backend.Winery.create({
                    name: winery
                  }, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return winery = arguments[0];
                      };
                    })(),
                    lineno: 31
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  return __iced_k(wine.winery_id = winery.id);
                });
              }
            })(__iced_k);
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
          backend.Wine.create(wine, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return wine = arguments[0];
              };
            })(),
            lineno: 35
          }));
          __iced_deferrals._fulfill();
        })(function() {
          bottle = {
            wine: "/api/v1/wine/" + wine.id + "/",
            cellar: "/api/v1/cellar/" + cellar + "/"
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
              lineno: 39
            }));
            __iced_deferrals._fulfill();
          })(function() {
            return window.location = "/collection.html";
          });
        });
      });
    });
    $("#winename").val(window.location.hash.substr(1));
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
        lineno: 45
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
          lineno: 46
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return $("#cellar").html(html);
      });
    });
  });

}).call(this);
