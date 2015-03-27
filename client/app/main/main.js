'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.thing', {
        url: '/:thing',
      })
      .state('main.thing.name', {
        url: '/1',
      })
      .state('main.thing.gender', {
        url: '/2',
      })
      .state('main.thing.nationality', {
        url: '/3',
      });
  });