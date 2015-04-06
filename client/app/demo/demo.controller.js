'use strict';

angular.module('keystoneApp')
  .controller('DemoCtrl', function ($scope, $http, $state, socket) {
  
    $scope.$state = $state;
    
    if(typeof $state.params.id === "undefined" || $state.params.id === ''){
      console.log('heyhey')
      var count = 0;
    }
    else {
      var count = $state.params.id;
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      console.log(fromParams, toParams)
      if(parseInt(fromParams.id) > parseInt(toParams.id)){

        count = $state.params.id;
      }
      if(toParams.id=== 'add'){
        $state.go('demo.add');
      }

    })

    $scope.audioClips = 
      [
        {
          src: '_1givemeaname',

        },
        {
          title: 'please state a name',
          src: '_0on',
          desc: 'ex. you\'re name is (name)'
        },
        {
          title: '"Steven" is that correct?',
          src: '_0off',
        },
        {
          title: 'Alright, my name is',
          src: '_2alrightimsteven',
          input: ': Steven'
        },
        {
          title: 'Please choose a gender',
          src: '_3chooseagender'
        },
        {
          title: 'Please choose a gender',
          src: '_0on',
          desc: 'ex. you are (gender)'
        },
        {
          title: '"Male" is that correct?',
          src: '_0off'
        },
        {
          title: 'Excellent, I am Steven?',
          src: '_4iamsteven'
        },
        {
          title: 'Where is he from?',
          src: '_5whereamifrom'
        },
        {
          title: 'Where is he from?',
          src: '_0on',
          desc: 'ex. you\'re from (location)'
        },
        {
          title: '"London" is that correct?',
          src: '_0off'
        },
        {
          title: 'Excellent! I am from London',
          src: '_6fromlondon'
        },
      ];


    

    //defines count at start  


    $scope.nextStep = function() {
      if(count >= $scope.audioClips.length){
        $state.go('demo.add');
        return false;
      }

      $state.go('demo.step',{id: count});
      $('.step-' + count)[0].play();
      
      count++;
    }
    //navigation
    //
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings, function(){});


    });

    $scope.refreshDemo = function(){

      $state.go('demo',{}, {reload: true});
    }

    $scope.open = false;
    $scope.opendrawer = function() {
      $scope.open = !$scope.open;
    }
     $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
    //end of navigation
    
    //last few steps
    function vibrate(){
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
           
        if (navigator.vibrate) {
            navigator.vibrate(500);
        }
    }
    
    $scope.submitSteven = function() {
      $http.post('/api/things', { name: 'Steven'}).
        success(function(data, status, headers, config) {
          vibrate();
        });
    };

    $scope.submitSebastian = function() {
      $http.post('/api/things', { name: 'Sebastian'}).
        success(function(data, status, headers, config) {
          vibrate();
        });
    };
    
     $scope.introSteven = function() {
      $http.post('/api/things', { name: 'intro'}).
        success(function(data, status, headers, config) {
          vibrate();
        });
    };

    var submitCounter = 0;
    $scope.submitData = function() {
      switch(submitCounter){
        case 0:
          console.log('added steven')
          $scope.submitSteven();
          break;
        case 1:
          console.log('added seb')
          $scope.submitSebastian();
          break;
        case 2:
          console.log('introsteven')
          $scope.introSteven();
          break;
        case 3:
          console.log('lampOn')
          $http.get('/api/mqtt/lampOn').success(function(data, status, headers, config) {});
          break;
        case 4:
          console.log('lampOff')
          $http.get('/api/mqtt/lampOff').success(function(data, status, headers, config) {});
          break;
      }
      submitCounter++;
    }

    //end of ctrl
  });

angular.module('keystoneApp')
.directive('audios', function($sce) {
  return {
    restrict: 'A',
    scope: { code:'=', idx: '=' },
    replace: true,
    template: '<audio controls class="step-{{idx}}"><source ng-src="{{url}}" type="audio/mpeg"></audio>',
    link: function (scope) {
        console.log(scope.idx)
        scope.$watch('code', function (newVal, oldVal) {
           if (newVal !== undefined) {
               scope.url = $sce.trustAsResourceUrl("../assets/audio/" + newVal + '.mp3');
           }
        });
    }
  };
});