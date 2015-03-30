'use strict';

angular.module('keystoneApp')

  .controller('MainCtrl', function ($scope, $http, socket, Devices, $state, $timeout,Speech) {

    $scope.awesomeThings = [];
    $scope.newTodo = '';
    $scope.$state= $state;
    console.log($scope.$state)
    //this is to toggle different devices based on the device. 
    //example being the add button... it's a bit hacky.
    $scope.isMobile = Devices.isMobile();
    $scope.selectedIndex = 0;

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;

// 0. init default 
      socket.syncUpdates('thing', $scope.awesomeThings, function(){
          // this callback allows a redirect 
          // to the latest thing being snapped
          // when a picture has been snapped redirect to edit it.
          
 
          $scope.selectedIndex = $scope.awesomeThings.length-1;
          $state.go('main.thing', {thing: $scope.awesomeThings[$scope.selectedIndex].name});
          
        
      });
   
    });

    //ann yang

    // Start listening.
    $scope.startYangDefault = function(){
      $state.go('main.thing.name');
      annyang.start();
    };

    $scope.startYang = function() {
      annyang.start();
    };

   
    var enumerator = 0;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        
// 1. init
        switch(toState.url)
          {
          case '/1':
            Speech.speak('Please, give me a name');
            annyang.addCommands(commands[0]);
            break;
          case '/2':
            Speech.speak('Now what gender am I?');
            annyang.addCommands(commands[1]);
            break;
          case '/3':
            Speech.speak('And where am I from?');
            annyang.addCommands(commands[2]);
            break;
          }



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
//02 end redirect
    var commands = [
      {
        'your name is :name': function(name){
          $scope.newTodo = name;
          Speech.speak('Okay, My name is '+ name);
          $scope.$apply();
          $state.go('main.thing.gender')
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        },
      },
      {
        ':name you are :gender': function(name, gender){
          $scope.newTodo = name + gender;
          Speech.speak('Okay, I am ' + gender);
          $scope.$apply();
          $state.go('main.thing.nationality');
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        }
      },
      {
        ':name you are from :location': function(name, location){
          $scope.newTodo = name + location;
          Speech.speak('awesome, I am from' + location);
          $scope.$apply();
          $state.go('main.thing.introduce');
          $timeout(function(){annyang.abort(); console.log('hey abort')},1000)
          
        }
      }
    ]
    
    // Add our commands to annyang
    


    // Add this in there to delete from DB so I dont have to do it from ROBOMONGO
    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.introduce = function() {
      var lastIdx = $scope.awesomeThings.length-1;
      
      $scope.currentThing = {
        _id: $scope.awesomeThings[lastIdx]._id,
        name: $scope.awesomeThings[lastIdx].name,
        power: true,
      };
      console.log($scope.currentThing, 'currentthing');
      $http.patch('/api/things/' + $scope.awesomeThings[lastIdx]._id, $scope.currentThing).success(function (thing) {
        console.log(thing, 'successful Patch');
        $scope.awesomeThings = thing;
      })
    };
  });





