angular.module('Chest').controller('LoginController', function($scope, $window) {
    $scope.onGitHubButtonClick = function onGitHubButtonClick() {
        $window.location = "http://localhost:3000/login/github";
    };
});
