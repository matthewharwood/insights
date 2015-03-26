'use strict';

angular.module('keystoneApp')
  .directive('rtcSnapshot', function (Devices) {
    return {
      templateUrl: 'components/rtcCamera/rtcSnapshot/rtcSnapshot.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        
        scope.isMobile = Devices.isMobile();

      }
    };
  });
  
angular.module('keystoneApp')
  .directive('fileReader', function($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {

                if (!ngModel) return;

                ngModel.$render = function() {};
                
                element.bind('change', function(e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (element.multiple) ngModel.$setViewValue(values);
                            else ngModel.$setViewValue(values.length ? values[0] : null);
                        });

                    function readFile(file) {
                        console.log(file);
                        var deferred = $q.defer();

                        var reader = new FileReader();
                        reader.onload = function(e) {
                            
                            deferred.resolve(e.target.result);
                        };
                        reader.onerror = function(e) {
                           
                            deferred.reject(e);
                        };
                        reader.readAsDataURL(file);
                       
                        // scope.cap = 
                        return deferred.promise;
                    }

                }); //change

            } //link
    }; //return
});
// angular.module('keystoneApp')
//   .directive('fileread', function (Devices) {
//     return {
//       scope: {
//             fileread: "="
//       },
//       restrict: 'A',
//       link: function (scope, element, attrs) {
//         console.log(scope.fileread, 'yoyo');
//         element.bind("change", function (changeEvent) {
//           scope.$apply(function () {
//               scope.fileread = changeEvent.target.files[0];
//           });
//       });

//       }
//     };
//   });