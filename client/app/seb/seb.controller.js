'use strict';

angular.module('keystoneApp')
  .controller('SebCtrl', function ($scope,$http,socket,Speech) {
    $scope.message = 'Hello';
      // annyang.start();
     $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

// 0. init default
      var lock = false
      socket.syncUpdates('thing', $scope.awesomeThings, function(){

          // $scope.selectedIndex = $scope.awesomeThings.length-1;
          // console.log($scope.awesomeThings[0], 'no', $scope.awesomeThings)
          // if($scope.awesomeThings[$scope.selectedIndex].name === 'seb00123' && $scope.awesomeThings[0].power ) {
          //   Speech.speak('Hello World, My name is Sebastian Lamp, and I am from Germany', "male", "germany");
          // }
          if(_.contains(_.pluck($scope.awesomeThings, 'name'),'Sebastian', 0) && !lock) {
              Speech.speak('Hello World, My name is Sebastian, and I am from Germany', "male", "germany");
              lock = true;
          }

      });

    });
  });
