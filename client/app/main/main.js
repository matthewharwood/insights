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
        url: '/name',
      })
      .state('main.thing.gender', {
        url: '/gender',
      })
      .state('main.thing.nationality', {
        url: '/nationality',
      });
  });