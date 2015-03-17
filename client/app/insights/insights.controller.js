'use strict';

angular.module('keystoneApp')
  .controller('InsightsCtrl', function ($scope, $http, Auth) {
    var apiKey = '45182442';
    var sessionId = "1_MX40NTE4MjQ0Mn5-MTQyNjU0NTY3NzQ4MX5FLzlMWTNFNjY4TENwaENOWE0vV0ZwMVN-fg";
    var token = "T1==cGFydG5lcl9pZD00NTE4MjQ0MiZzaWc9MGRjY2Q5MjYxODY3NmVkNDc4MGY4OGM5YTQ5YjM0OWFjZDA1YTEyZTpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5URTRNalEwTW41LU1UUXlOalUwTlRZM056UTRNWDVGTHpsTVdUTkZOalk0VEVOd2FFTk9XRTB2VjBad01WTi1mZyZjcmVhdGVfdGltZT0xNDI2NTQ1NzEzJm5vbmNlPTAuNTMzMzIxNDUyNjUxODM4NQ==";
    var session = OT.initSession(apiKey, sessionId);
    var isAdmin = Auth.isAdmin();
    var canvas = document.getElementById('touchCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var boundaries = [
      {
        startX: window.innerWidth/3,
        startY: 0,
        endX: window.innerWidth/3,
        endY: window.innerHeight
      },
      {
        startX: window.innerWidth - (window.innerWidth/3),
        startY: 0,
        endX: window.innerWidth - (window.innerWidth/3),
        endY: window.innerHeight
      },
      {
        startX: 0,
        startY: window.innerHeight /3,
        endX: window.innerWidth,
        endY: window.innerHeight /3
      },
      {
        startX: 0,
        startY: window.innerHeight - (window.innerHeight /3),
        endX: window.innerWidth,
        endY: window.innerHeight - (window.innerHeight / 3)
      }
    ];

    /*ctx.beginPath();
    ctx.moveTo(boundaries[0].startX,boundaries[0].startY);
    ctx.lineTo(boundaries[0].endX,boundaries[0].endY);
    ctx.stroke();
    ctx.moveTo(boundaries[1].startX,boundaries[1].startY);
    ctx.lineTo(boundaries[1].endX,boundaries[1].endY);
    ctx.stroke();
    ctx.moveTo(boundaries[2].startX,boundaries[2].startY);
    ctx.lineTo(boundaries[2].endX,boundaries[2].endY);
    ctx.stroke();
    ctx.moveTo(boundaries[3].startX,boundaries[3].startY);
    ctx.lineTo(boundaries[3].endX,boundaries[3].endY);
    ctx.stroke();*/


    $(canvas).on('click', clickHandler);

    function clickHandler(e){
      //e.preventDefault();
      if (e.clientX < boundaries[0].startX){
        $scope.sendMQTT(2);
      } else if (e.clientX > boundaries[1].startX){
        $scope.sendMQTT(0);
      } else if (e.clientX > boundaries[0].startX && e.clientX < boundaries[1].startX){
        $scope.sendMQTT(1);
      }
    }


    session.on({
      streamCreated: function (event) {
        session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'});
      }
    });


    session.connect(token, function (error) {
      if (error) {
        console.log(error.message);
      } else {
        if (isAdmin) {
          session.publish('myPublisherDiv', {width: 1000, height: 240});
        }
      }
    });


    $scope.sendMQTT = function (idx) {
      $http.post('api/mqtt/' + idx).then(function (data) {
        console.log(data);
      })
    };

  });
