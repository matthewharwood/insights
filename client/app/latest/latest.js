'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('latest', {
        url: '/latests',
        templateUrl: 'app/latest/latest.html',
        controller: 'LatestCtrl'
      });
  });

