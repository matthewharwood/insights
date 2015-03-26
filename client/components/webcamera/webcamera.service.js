'use strict';

angular.module('keystoneApp')
  .factory('Webcam', function(){

    var Webcam = {};
    Webcam.init = function(){
      Webcam.params.isOn = true;
      return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    };
    Webcam.stop = function(){
      Webcam.params.isOn = false;
      Webcam.params.getLocalStream().stop();
    };
    Webcam.errorHandler = function(){
      Webcam.params.isOff = false;
      Webcam.params._stream = undefined;
      console.log('Please enable your webcam and use either Google or Firefox browsers');

    };
    Webcam.params = {
      _stream: undefined,
      isOn: false,
      setLocalStream: function(stream){
        this._stream = stream;
      },
      getLocalStream: function(){
        return this._stream;
      }
    };
    return Webcam;



  });
