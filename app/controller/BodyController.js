angular.module('Chest').controller('BodyController', function($scope, $rootScope, EVENT_ENUM) {
  $scope.layout = 'onecolumn';

  var oneColCb = $rootScope.$on(EVENT_ENUM.LAYOUT_ONE_COLUMN, function() {
    $scope.layout = 'onecolumn';
  });

  var twoColCb = $rootScope.$on(EVENT_ENUM.LAYOUT_TWO_COLUMN, function() {
    $scope.layout = 'twocolumn';
  });

  $rootScope.$on('$destroy', function() {
    oneColCb();
    twoColCb();
  });
});
