'use strict';

angular.module('keystoneApp')
  .controller('InsightsCtrl', function ($scope, $http) {
    var apiKey = '45182442';
    var sessionId = "1_MX40NTE4MjQ0Mn5-MTQyNjU0NTY3NzQ4MX5FLzlMWTNFNjY4TENwaENOWE0vV0ZwMVN-fg";
    var token = "T1==cGFydG5lcl9pZD00NTE4MjQ0MiZzaWc9MGRjY2Q5MjYxODY3NmVkNDc4MGY4OGM5YTQ5YjM0OWFjZDA1YTEyZTpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5URTRNalEwTW41LU1UUXlOalUwTlRZM056UTRNWDVGTHpsTVdUTkZOalk0VEVOd2FFTk9XRTB2VjBad01WTi1mZyZjcmVhdGVfdGltZT0xNDI2NTQ1NzEzJm5vbmNlPTAuNTMzMzIxNDUyNjUxODM4NQ==";
    var session = OT.initSession(apiKey, sessionId);

    session.on({
      streamCreated: function(event) {
        session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'});
      }
    });

    session.connect(token, function(error) {
      if (error) {
        console.log(error.message);
      } else {
        session.publish('myPublisherDiv', {width: 320, height: 240});
      }
    });

    $scope.sendMQTT = function(idx){
      $http.post('api/mqtt/' + idx).then(function(data){
        console.log(data);
      })
    }
    $scope.closeMQTT = function(){

    }

  });
