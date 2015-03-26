'use strict';

describe('Service: webcamera', function () {

  // load the service's module
  beforeEach(module('keystoneApp'));

  // instantiate service
  var webcamera;
  beforeEach(inject(function (_webcamera_) {
    webcamera = _webcamera_;
  }));

  it('should do something', function () {
    expect(!!webcamera).toBe(true);
  });

});
