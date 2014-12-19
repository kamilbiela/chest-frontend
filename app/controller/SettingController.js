angular.module('Chest').controller('SettingController', function($scope, $http) {

  $scope.isLoaded = false;
  $scope.apiToken = "";

  $http.get('/api/setting').then(function(response) {
    $scope.apiToken = response.data.ApiToken;
  }).finally(function() {
    $scope.isLoaded = true;
  });

});
