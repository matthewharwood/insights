'use strict';

angular.module('keystoneApp')
  .factory('Devices', function () {
    // Service logic
    // ...

    var mobileBool = device.mobile();

    // Public API here
    return {
      isMobile: function () {
        return mobileBool;
      }
    };
  });
