// Generated by CoffeeScript 1.9.2
define(function(require, exports, module) {
  "use strict";
  var Firebase, UserService;
  Firebase = require("firebase");
  UserService = (function() {
    function UserService(fbRef1) {
      this.fbRef = fbRef1;
    }

    UserService.prototype.getUser = function() {
      return this.fbRef.getAuth();
    };

    UserService.prototype.register = function(email, password, callback) {
      this.fbRef.createUser({
        email: email,
        password: password
      }, function(error, userData) {
        if (callback != null) {
          return callback(error, userData);
        }
      });
    };

    UserService.prototype.login = function(email, password, callback) {
      fbRef.authWithPassword({
        email: email,
        password: password
      }, function(error, authData) {
        if (callback != null) {
          return callback(error, authData);
        }
      });
    };

    UserService.prototype.logout = function() {
      this.fbRef.unauth();
    };

    UserService.prototype.changeEmail = function(oldEmail, newEmail, password, callback) {
      this.fbRef.changeEmail({
        oldEmail: oldEmail,
        newEmail: newEmail,
        password: password
      }, function(error) {
        if (callback != null) {
          return callback(error);
        }
      });
    };

    UserService.prototype.changePassword = function(email, oldPassword, newPassword, callback) {
      this.fbRef.changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function(error) {
        if (callback != null) {
          return callback(error);
        }
      });
    };

    UserService.prototype.resetPassword = function(email, callback) {
      this.fbRef.resetPassword({
        email: email
      }, function(error) {
        if (callback != null) {
          return callback(error);
        }
      });
    };

    return UserService;

  })();
  return module.exports = UserService;
});
