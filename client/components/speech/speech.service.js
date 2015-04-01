'use strict';

angular.module('keystoneApp')
  .factory('Speech', function () {
    var Speech = {};
    Speech.voices = speechSynthesis.getVoices();
    Speech.messages = [];


    Speech.setMsg = function (msg) {
      if (!SpeechSynthesisUtterance) {
        throw new Error("Speech Synthesis API not available");
      } else {
        var _msg = new SpeechSynthesisUtterance(msg);
        return _msg;
      }
    };

    Speech.getMessages = function (start, end) {
      if (!arguments.length) {
        return Speech.messages;
      }
      if (start === "last") {
        return Speech.messages[Speech.messages.length - 1]
      }
      return arguments.length === 1 ? Speech.messages[start] : Speech.messages.slice(start, end);
    };

    Speech.setCurrentParams = function (gender) {
      for (var param in Speech.params[gender]) {
        Speech.currentParams[param] = Speech.params[gender][param]()
      }
    };

    Speech.getCurrentParams = function (msg) {
      for (var param in Speech.currentParams) {
        console.log(Speech.currentParams[param])
        msg[param] = Speech.currentParams[param];
        console.log(msg);
      }
      console.log(msg);
      console.log(Speech.currentParams);
      return msg;
    }

    Speech.speak = function (msg, gender, origin) {

      if (arguments.length < 1) {
        throw new Error("no arguments defined")
      }
      var _msg = Speech.setMsg(msg);
      if (arguments.length === 1) {
        _msg.voice = getVoice('Trinoids');
      }
      if (arguments.length == 2) {
        if (gender == "male") {
          _msg.voice = getVoice("Bruce");

        } else if (gender == "female") {
          _msg.voice = getVoice('Fiona');
        }
      }
      if (arguments.length == 3) {
        if (origin == "england" && gender == "male") {
          _msg.voice = getVoice('Google UK English Male');
        } else if (origin == "england" && gender == "female") {
          _msg.voice = getVoice('Google UK English Female');
        }
        else if (origin == "germany" && gender == "male") {
          _msg.voice = getVoice('Carmit');
        } else if (origin == "germany" && gender == "female") {
          _msg.voice = getVoice('Anna')
        }
      }

      speechSynthesis.speak(_msg);

    };
    function getVoice(name) {
      return window.speechSynthesis.getVoices().filter(function (voice) {
        return voice.name == name;
      })[0];
    }


    /*Speech.params = {
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
     };*/
    return Speech;

  });