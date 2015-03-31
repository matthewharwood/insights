'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('seb', {
        url: '/seb',
        templateUrl: 'app/seb/seb.html',
        controller: 'SebCtrl'
      });
  });