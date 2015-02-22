angular.module('Chest').factory('AuthService', function($window) {

  var storageKeyName = "token";
  var storage = $window.localStorage;
  var token = storage.getItem(storageKeyName);


  function AuthService() {

  }

  AuthService.prototype.setToken = function setToken(v) {
    token = v;
    storage.setItem(storageKeyName, v);
  };

  AuthService.prototype.hasToken = function hasToken() {
    return token !== null && angular.isString(token) && token.length > 0;
  };

  AuthService.prototype.removeToken = function removeToken() {
    token = "";
    storage.setItem(storageKeyName, "");
  };

  AuthService.prototype.getToken = function getToken() {
    return token;
  };

  return new AuthService();
});
