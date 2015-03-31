'use strict';

angular.module('keystoneApp')
  .controller('LatestCtrl', function ($scope, $http, socket, Speech) {
    $scope.message = 'Hello';
      // annyang.start();
     $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

// 0. init default
      socket.syncUpdates('thing', $scope.awesomeThings, function(){
          $scope.selectedIndex = $scope.awesomeThings.length-1;
          console.log($scope.awesomeThings[$scope.selectedIndex], 'no', !$scope.awesomeThings[0].power)
          console.log($scope.awesomeThings, 'updated things in latestctrl');

          if(typeof $scope.awesomeThings[$scope.selectedIndex].power !== 'undefined' && $scope.awesomeThings[$scope.selectedIndex].power ) {
            Speech.speak('Hello World, My name is Steven Brick, and I am from London', 'male', 'england');
          }else if(typeof $scope.awesomeThings[0].power !== 'undefined' && !$scope.awesomeThings[0].power) {
            Speech.speak('Hello Sebastian, My name is Steven, pleased to meet you', 'male', 'england');
          } else {
            return false;
          }



      });

    });
  });
