'use strict';

angular.module('keystoneApp')
  .controller('SpacesCtrl', function ($scope,$http, Auth) {


    $scope.currentUser = Auth.getCurrentUser();

    $scope.newSpace = {};

    $scope.newSpace.owner = $scope.currentUser._id;

    $scope.registerSpace = function() {

      if(typeof $scope.newSpace.name === 'undefined') {
        console.log('validation please add a name');
        return;
      }
      
      $http.post('/api/spaces/' + $scope.currentUser._id, $scope.newSpace);
      $scope.newSpace = '';
      console.log($scope.newSpace, $scope.getCurrentUser);
    };
  });
