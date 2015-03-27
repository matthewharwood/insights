'use strict';

angular.module('keystoneApp')
  .controller('MainCtrl', function ($scope, $http, socket, Devices, Speech) {
    $scope.awesomeThings = [];
    $scope.isMobile = Devices.isMobile();
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    //ann yang

    $scope.newTodo = 'heyhey';
    var commands = {
      'hello *val': function(val){
        $scope.newTodo = val;
        Speech.speak(val);
        $scope.$apply();
      }
    }
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  });
