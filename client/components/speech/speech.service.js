'use strict';

angular.module('keystoneApp')
  .factory('Speech', function () {
    var Speech = {};
    Speech.voices = [];
    Speech.messages = [];

    Speech.setMsg = function (msg) {
      if (!SpeechSynthesisUtterance) {
        throw new Error("Speech Synthesis API not available");
      } else {
        var _msg = new SpeechSynthesisUtterance(msg);
        Speech.messages.push({data: _msg, msg: msg, birthday: Date.now()});
        return _msg;
      }
    };

    Speech.getMessages = function (start, end) {
      if (!arguments.length) {
        return Speech.messages;
      }
      if (start === "last"){
        return Speech.messages[Speech.messages.length-1]
      }
      return arguments.length === 1 ? Speech.messages[start] : Speech.messages.slice(start, end);
    };
    
    Speech.setCurrentParams = function(gender){
      for (var param in Speech.params[gender]){
        Speech.currentParams[param] = Speech.params[gender][param]()
      }
    };

    Speech.getCurrentParams = function(msg){
      for (var param in Speech.currentParams){
        console.log(Speech.currentParams[param])
        msg[param] = Speech.currentParams[param];
        console.log(msg);
      }
      console.log(msg);
      console.log(Speech.currentParams);
      return msg;
    }

    Speech.speak = function (msg) {
      var msg = Speech.setMsg(msg);
      if (Speech.currentParams){
        msg = Speech.getCurrentParams(msg);
      }
      speechSynthesis.speak(msg);
    };
    Speech.currentParams = {    };

    Speech.params = {
      male: {
        voice: function(){
          return speechSynthesis.getVoices()[1];
        }
      },
      female: {
        voice: function(){
          return speechSynthesis.getVoices()[2]
        }
      }
    };
    return Speech;

  });
