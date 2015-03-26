'use strict';

describe('Directive: rtcSnapshot', function () {

  // load the directive's module and view
  beforeEach(module('keystoneApp'));
  beforeEach(module('components/rtcCamera/rtcSnapshot/rtcSnapshot.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rtc-snapshot></rtc-snapshot>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the rtcSnapshot directive');
  }));
});