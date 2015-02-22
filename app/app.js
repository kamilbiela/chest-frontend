angular.module('Chest', ['ui.router']);

angular.module('Chest').config(function($httpProvider) {
  $httpProvider.interceptors.push(function(AuthService, $q, $rootScope, EVENT_ENUM) {
    function isApiCall(url) {
      return url.indexOf("api/") !== -1;
    }

    return {
      'request': function(config) {
        if (isApiCall(config.url)) {
          var params = config.params || {};
          params.token = AuthService.getToken();
          config.params = params;
        }

        return config;
      },

      // optional method
      'responseError': function(rejection) {
        if (isApiCall(rejection.config.url) && rejection.status === 403) {
          $rootScope.$emit(EVENT_ENUM.USER_TOKEN_ERROR);
        }

        return $q.reject(rejection);
      }
    };
  });
});

angular.module('Chest').run(function($state, $rootScope, EVENT_ENUM, AuthService) {
  $rootScope.$on(EVENT_ENUM.USER_TOKEN_ERROR, function() {
    AuthService.removeToken();
    $state.go('login');
  });
});
