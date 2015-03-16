'use strict';

angular.module('keystoneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('spaces', {
        url: '/spaces',
        templateUrl: 'app/spaces/spaces.html',
        authenticate: true,
        controller: 'SpacesCtrl'
      });
  });