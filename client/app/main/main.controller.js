'use strict';

angular.module('keystoneApp')

  .controller('MainCtrl', function ($scope, $http, socket, Devices, $state, $timeout,Speech) {

    $scope.awesomeThings = [];

    //this is to toggle different devices based on the device. 
    //example being the add button... it's a bit hacky.
    $scope.isMobile = Devices.isMobile();
    $scope.selectedIndex = 0;
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

      socket.syncUpdates('thing', $scope.awesomeThings, function(){
          // this callback allows a redirect 
          // to the latest thing being snapped
          // when a picture has been snapped redirect to edit it.
          $scope.selectedIndex = $scope.awesomeThings.length-1;
          console.log('selectedindex', $scope.selectedIndex);
          $state.go('main.thing', {thing: $scope.awesomeThings[$scope.selectedIndex].name});
        
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
    var commands = [
      {
        'hello *val': function(val){
          $scope.newTodo = val;
          Speech.speak(val);
          $scope.$apply();
          $state.go('main.thing.gender')
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        }
      },
      {
        'friend you are *val': function(val){
          $scope.newTodo = val;
          
          $scope.$apply();
          $state.go('main.thing.nationality');
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        }
      },
      {
        'friend you are from *val': function(val){
          $scope.newTodo = val;
          
          $scope.$apply();
          $state.go('main.thing.nationality');
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        }
      }
    ]
    
    // Add our commands to annyang
    

    // Start listening.
    
    var enumerator = 0;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        console.log(toState.url);
        switch(toState.url)
          {
          case '/1':
            annyang.addCommands(commands[0]);
            annyang.start();
          case '/2':
            annyang.addCommands(commands[1]);
            annyang.start();
          
          case '/3':
            annyang.addCommands(commands[2]);
            annyang.start();
          }
      // switch (enumerator){
      //   case 0:
      //     enumerator = 1;
      //     break;
      //   case 1:
      //     annyang.addCommands(commands);
      //     annyang.start();
      //   case 2:
      //     annyang.addCommands(commands2);
      //     annyang.start();

      // }


        //get the route name
        //excute timeline Timeline.branch[$state.name]
        //Timeline.branch[$state.name].init
        //check database for properties
        ////Speech.speak()
        //// wait for Command
        //// when command has been met
        //// Speech.speak(feedback *val)
        //// Submit data to Thing mongo

    });
  });
