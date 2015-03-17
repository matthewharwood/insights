'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('insights', {
        url: '/insights',
        templateUrl: 'app/insights/insights.html',
        controller: 'InsightsCtrl',
        onExit: function($http){
          $http.get('api/mqtt/close').then(function(data){
            console.log(data);
          });
        }
      }
    );
  });
