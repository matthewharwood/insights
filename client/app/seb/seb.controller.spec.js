'use strict';

describe('Controller: SebCtrl', function () {

  // load the controller's module
  beforeEach(module('keystoneApp'));

  var SebCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SebCtrl = $controller('SebCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
