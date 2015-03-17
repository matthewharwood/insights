'use strict';

describe('Controller: InsightsCtrl', function () {

  // load the controller's module
  beforeEach(module('keystoneApp'));

  var InsightsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InsightsCtrl = $controller('InsightsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
