'use strict';

angular.module('keystoneApp')
  .controller('LatestCtrl', function ($scope, $http, socket, Speech, $timeout, $state) {
    $scope.message = 'Hello';
      // annyang.start();
     $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      
// 0. init default
      var lock = [false, false];

      socket.syncUpdates('thing', $scope.awesomeThings, function(){
          console.log('lock',lock)
          if($scope.awesomeThings.length === 0){
            lock = [false, false];
            console.log('lock',lock)
          }
          // $scope.selectedIndex = $scope.awesomeThings.length-1;
          // console.log($scope.awesomeThings[$scope.selectedIndex], 'no', !$scope.awesomeThings[0].power)
          // console.log($scope.awesomeThings, 'updated things in latestctrl');

          // if(typeof $scope.awesomeThings[$scope.selectedIndex].power !== 'undefined' && $scope.awesomeThings[$scope.selectedIndex].power ) {
          //   Speech.speak('Hello World, My name is Steven Brick, and I am from London', 'male', 'england');
          // }else if(typeof $scope.awesomeThings[0].power !== 'undefined' && !$scope.awesomeThings[0].power) {
          //   Speech.speak('Hello Sebastian, My name is Steven, pleased to meet you', 'male', 'england');
          // } else {
          //   return false;
          // }
          
          // Speech.speak('here weo go', 'male', 'england');
          
          if(_.contains(_.pluck($scope.awesomeThings, 'name'),'Steven',0) && !lock[0]) {
              Speech.speak('Hello World, My name is Steven, and I am from London', 'male', 'england');
              lock[0] = true;
          }

          if(_.contains(_.pluck($scope.awesomeThings, 'name'),'intro', 0) && !lock[1]) {
              Speech.speak('Hello Sebastian, My name is Steven, pleased to meet you', 'male', 'england');
              $timeout(function(){
                $http.get('/api/mqtt/light').success(function(data, status, headers, config) {});
              }, 2000); 
              
              lock[1] = true;
          }
          // 
          // if(_.contains(_.pluck($scope.awesomeThings, 'name'),'Steven',0)) {
          //     Speech.speak('Hello World, My name is Steven, and I am from London', 'male', 'england');
          //     // lock[0] = true;
          // }

          // if(_.contains(_.pluck($scope.awesomeThings, 'name'),'intro', 0)) {
          //     Speech.speak('Hello Sebastian, My name is Steven, pleased to meet you', 'male', 'england');
          //     // lock[1] = true;
          // }
      });

    });
  });
