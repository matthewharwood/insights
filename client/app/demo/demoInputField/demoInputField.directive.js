'use strict';

angular.module('keystoneApp')
  .directive('demoInputField', function ($state) {
    return {
      templateUrl: 'app/demo/demoInputField/demoInputField.html',
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs) {
        scope.$state = $state;
        scope.moveToDemo = function() {
          $state.go('demo.step', {id: 0});
        }
      }
    };
  });