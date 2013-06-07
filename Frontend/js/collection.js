// Generated by IcedCoffeeScript 1.4.0c
(function() {
  var addListeners, iced, __iced_k, __iced_k_noop,
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

  window.cellsPerRow = function() {
    var width;
    width = $("#results").width();
    if (width > 960) {
      return 5;
    } else if (width > 768) {
      return 4;
    } else if (width > 480) {
      return 3;
    } else {
      return 2;
    }
  };

  window.isotopeResults = function() {
    $("#results").isotope({
      itemSelector: '.result',
      resizable: false,
      layoutMode: 'cellsByRow',
      cellsByRow: {
        columnWidth: $("#results").width() / cellsPerRow(),
        rowHeight: 270
      },
      getSortData: {
        name: function($elem) {
          return $elem.find(".name").text();
        },
        date: function($elem) {
          return parseInt($elem.data("timestamp"));
        },
        bottles: function($elem) {
          return parseInt($elem.find(".numbottles").text());
        },
        retailPrice: function($elem) {
          return parseInt($elem.find(".retailPrice").text().replace("$", ""));
        },
        alcoholcontent: function($elem) {
          return parseInt($elem.find(".alcoholcontent").text().replace("%", ""));
        }
      }
    });
    $("#results").mouseenter(function() {
      $(window).resize();
      return $('#results').isotope("reLayout");
    });
    return $("#results").on("click", ".result", function() {
      return $(this).toggleClass("selected");
    });
  };

  addListeners = function() {
    $("#add-wine-name-button").click(function(event) {
      var wineName;
      event.preventDefault();
      if (selectedWine) {
        return window.location = "/addwine.html#" + selectedWine.id;
      } else {
        wineName = $("#wine-name-input").val();
        return window.location = "/addwine.html#" + wineName;
      }
    });
    $("#deleteconfirm").click(function(event) {
      event.preventDefault();
      if ($("#deletetext").val().trim() === "DELETE") {
        $(".selected").each(function() {
          var bottleId;
          bottleId = $(this).data("id");
          return backend.Bottle["delete"](bottleId, function() {
            return {};
          });
        });
        $("#results").isotope("remove", $(".selected"));
        return $("#deletewine").modal("hide");
      } else {
        event.preventDefault();
        return $("#deletetext").valerror();
      }
    });
    $("a[href='#uploadbarcode']").click(function(event) {
      event.preventDefault();
      window.uploadMode = "barcode";
      return $("#imageselector").click();
    });
    $("a[href='#uploadlabel']").click(function(event) {
      event.preventDefault();
      window.uploadMode = "label";
      return $("#imageselector").click();
    });
    return $("#imageselector").change(function() {
      var wines, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        if (window.uploadMode === "barcode") {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/collection.iced"
            });
            backend.identifyBarcode(new FormData($("#wine-vision-form")[0]), __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return wines = arguments[0];
                };
              })(),
              lineno: 68
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/collection.iced"
            });
            backend.identifyLabel(new FormData($("#wine-vision-form")[0]), __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return wines = arguments[0];
                };
              })(),
              lineno: 71
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        }
      })(function() {
        if (!wines) wines = [];
        localStorage.setItem("visionResult", JSON.stringify(wines));
        return window.location = "autocompleteresults.html";
      });
    });
  };

  $(function() {
    var bottles, cellars, collection, nav, wineTypes, wineries, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    $("#sharelink").html("http://vinodex.us/print.html#" + window.backend.userId);
    addListeners();
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/collection.iced"
      });
      backend.Bottle.get({
        cellar__owner: backend.userId,
        limit: 1000
      }, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return bottles = arguments[0];
          };
        })(),
        lineno: 82
      }));
      backend.Cellar.get({
        owner: backend.userId
      }, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return cellars = arguments[0];
          };
        })(),
        lineno: 83
      }));
      __iced_deferrals._fulfill();
    })(function() {
      wineTypes = _.uniq(Util.flatMap(bottles, function(bottle) {
        return bottle.wine.wine_type;
      }));
      wineries = _.uniq(Util.flatMap(bottles, function(bottle) {
        return bottle.wine.winery;
      }), false, Util.byId);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/collection.iced"
        });
        window.frontend.renderTemplate("collection_wines", {
          bottles: bottles
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return collection = arguments[0];
            };
          })(),
          lineno: 87
        }));
        window.frontend.renderTemplate("collection_nav", {
          wineTypes: _.map(wineTypes, function(type) {
            return {
              type: type,
              pronounce: pronounce[type]
            };
          }),
          cellars: cellars,
          wineries: wineries
        }, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return nav = arguments[0];
            };
          })(),
          lineno: 91
        }));
        __iced_deferrals._fulfill();
      })(function() {
        $("#results").html(collection);
        $("#collection-nav-list").html(nav);
        window.isotopeResults();
        return $(".pronounciation").tooltip();
      });
    });
  });

}).call(this);
