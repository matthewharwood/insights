'use strict';

angular.module('keystoneApp')
  .controller('MainCtrl', function ($scope, $http, socket, Devices, $state) {
    $scope.awesomeThings = [];

    //this is to toggle different devices based on the device. 
    //example being the add button... it's a bit hacky.
    $scope.isMobile = Devices.isMobile();

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings, function(){
          // this callback allows a redirect 
          // to the latest thing being snapped
          // when a picture has been snapped redirect to edit it.
          var lastThing = $scope.awesomeThings.length-1;
          $state.go('main.thing', {thing: $scope.awesomeThings[lastThing].name});
        
      });
   
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
        
        $scope.$apply();
      }
    }
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
    $scope.$on('$stateChangeSuccess', function(){
        //get the route name
        //excute timeline Timeline.branch[$state.name]
        //Timeline.branch[$state.name].init
        ////Speech.speak()
        //// wait for Command
        //// when command has been met
        //// Speech.speak(feedback *val)
        //// Submit data to Thing mongo

    });
  });
