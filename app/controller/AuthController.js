angular.module('Chest').controller('AuthController', function($state, $stateParams, AuthService, $log) {
  var token = $stateParams.token;

  $log.debug('[AuthController] token: ', token);

  AuthService.setToken(token);
  $state.go('main.dashboard');
});
