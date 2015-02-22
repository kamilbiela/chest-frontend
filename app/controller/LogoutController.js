angular.module('Chest').controller('LogoutController', function(AuthService, $state) {
  AuthService.removeToken();
  $state.go('login');
});
