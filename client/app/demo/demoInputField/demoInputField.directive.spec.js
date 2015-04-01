'use strict';

describe('Directive: demoInputField', function () {

  // load the directive's module and view
  beforeEach(module('keystoneApp'));
  beforeEach(module('app/demo/demoInputField/demoInputField.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<demo-input-field></demo-input-field>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the demoInputField directive');
  }));
});