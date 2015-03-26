'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });