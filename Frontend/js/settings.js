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
    $("#validatesettings").click(function(event) {
      var email, name, pass, response, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      event.preventDefault();
      $("#settings").valreset();
      name = $("#name").vallength();
      email = $("#email").valemail();
      pass = $("#newpass").valnewpassword();
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/settings.iced"
        });
        backend.updateUserAccount(name, email, pass, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return response = arguments[0];
            };
          })(),
          lineno: 9
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return window.location = "collection.html";
      });
    });
    return $("#deleteacctconfirm").click(function(event) {
      var response, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      event.preventDefault();
      if ($("#deleteconfirmtext").val() === "DELETE") {
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "/Users/zgrannan/Dropbox/cse110/Frontend/coffee/settings.iced"
          });
          backend.deleteUserAccount(__iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                return response = arguments[0];
              };
            })(),
            lineno: 15
          }));
          __iced_deferrals._fulfill();
        })(function() {
          return __iced_k(window.location = "index.html");
        });
      } else {
        return __iced_k();
      }
    });
  });

}).call(this);
