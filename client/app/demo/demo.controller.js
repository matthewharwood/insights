'use strict';

angular.module('keystoneApp')
  .controller('DemoCtrl', function ($scope, $http, $state) {
  
    $scope.$state = $state;
    
    if(typeof $state.params.id === "undefined" || $state.params.id === ''){
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
    })
    $scope.audioClips = 
      [
        {
          src: '_1givemeaname.ogg',

        },
        {
          title: 'please state a name',
          src: '_0on.ogg',
          desc: 'ex. you\'re name is (name)'
        },
        {
          title: '"Steven" is that correct?',
          src: '_0off.ogg',
        },
        {
          title: 'Alright, my name is',
          src: '_2alrightimsteven.ogg',
          input: ': Steven'
        },
        {
          title: 'Please choose a gender',
          src: '_3chooseagender.ogg'
        },
        {
          title: 'Please choose a gender',
          src: '_0on.ogg',
          desc: 'ex. you are (gender)'
        },
        {
          title: '"Male" is that correct?',
          src: '_0off.ogg'
        },
        {
          title: 'Excellent, I am Steven?',
          src: '_4iamsteven.ogg'
        },
        {
          title: 'Where is he from?',
          src: '_5whereamifrom.ogg'
        },
        {
          title: 'Where is he from?',
          src: '_0on.ogg',
          desc: 'ex. you\'re from (location)'
        },
        {
          title: '"London" is that correct?',
          src: '_0off.ogg'
        },
        {
          src: '_6fromlondon.ogg'
        },
      ];


    

    //defines count at start  

    function doneSon(){
      console.log('done');
    }
    
    $scope.nextStep = function() {
      if(count >= $scope.audioClips.length){
        $state.go('demo.add');
        return false;
      }

      $state.go('demo.step',{id: count});
      $('.step-' + count)[0].play();
      
      count++;
    }
    
    //last few steps
    $scope.submitSteven = function() {
      $http.post('/api/things', { name: 'Steven'}).
        success(function(data, status, headers, config) {
          $scope.awesomeThings = data;
        });
    };

    $scope.submitSebastian = function() {
      $http.post('/api/things', { name: 'Sebastian'}).
        success(function(data, status, headers, config) {
          $scope.awesomeThings = data;
        });
    };
    
     $scope.introSteven = function() {
      $http.post('/api/things', { name: 'intro'}).
        success(function(data, status, headers, config) {
          $scope.awesomeThings = data;
        });
    };

    //end of ctrl
  });

angular.module('keystoneApp')
.directive('audios', function($sce) {
  return {
    restrict: 'A',
    scope: { code:'=', idx: '=' },
    replace: true,
    template: '<audio ng-src="{{url}}" controls class="step-{{idx}}"></audio>',
    link: function (scope) {
        console.log(scope.idx)
        scope.$watch('code', function (newVal, oldVal) {
           if (newVal !== undefined) {
               scope.url = $sce.trustAsResourceUrl("../assets/audio/" + newVal);
           }
        });
    }
  };
});