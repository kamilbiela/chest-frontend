angular.module('Chest').controller('LogoutController',  function(AuthService) {
  AuthService.removeToken();
  $state.go('login');
});
