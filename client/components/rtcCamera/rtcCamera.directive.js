'use strict';


/**
 * @ngdoc directive
 * @name abrickApp.directive:rtcCamera
 * @description
 * # rtcCamera
 */
angular.module('keystoneApp')
  .directive('rtcCamera', function (Webcam, $state) {

    return {
      restrict: 'EA',
      templateUrl: 'components/rtcCamera/rtcCamera.html',
      controller: function ($scope) {
        $scope.$state = $state;
        navigator.getUserMedia = Webcam.init();
        if (!navigator.getUserMedia) { //because Safari.
          Webcam.errorHandler();
          return;
        }

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({
            video: {
              mandatory: {
                minAspectRatio: 0.565,
                maxAspectRatio: 0.565,
                minHeight: 667,
                maxHeight: 667
              }
            }
          },
          function (pLocalMediaStream) {
            Webcam.params.setLocalStream(pLocalMediaStream);
            var lVideo = document.querySelector('#background-video');
            lVideo.autoplay = true;
            lVideo.src = URL.createObjectURL(pLocalMediaStream);
          }, Webcam.errorHandler);

      },
      link: function (scope) {

        // var ref = new Firebase('https://abrick.firebaseio.com/');

        // // create an AngularFire reference to the data
        // var sync = $firebase(ref);

        // // download the data into a local object

        // var syncObject = sync.$asObject();

        // //binds the scope.data to the database as so:
        // //$firebase(new Firebase(url).$asObject().$bindTo($scope, 'data'))
        // syncObject.$bindTo(scope, 'data');
        // scope.data = {
        //   capturedImage: undefined
        // };
        scope.takePic = function () {
          scope.disable = true;


          var canvas = document.getElementById('capture-frame');
          var ctx = canvas.getContext('2d');
          var video = document.querySelector('#background-video');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          scope.data.capturedImage = canvas.toDataURL('image/webp');
          //var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
        };
      }
    };
  });
