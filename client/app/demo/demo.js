'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('demo', {
        url: '/demo',
        templateUrl: 'app/demo/demo.html',
        controller: 'DemoCtrl'
      })
      .state('demo.step', {
        url: '/:id'
      })
      .state('demo.add', {
        url: '/add'
      });
  });