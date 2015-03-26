'use strict';

angular.module('keystoneApp')
  .controller('InsightsCtrl', function ($scope, $http, Auth) {
    var apiKey = '45185552';
var sessionId = "2_MX40NTE4NTU1Mn5-MTQyNjc5NDkyMzQyNH5aVFN1bitIZDF5bC84a0JaQWcrRzBHWmJ-fg";
      var token = "T1==cGFydG5lcl9pZD00NTE4NTU1MiZzaWc9ZDkyOGI0YTQ1ODVmOGFiNTM0YWY0NmU3Mjc2YzU5ODY0YjQxMzlhZDpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTJfTVg0ME5URTROVFUxTW41LU1UUXlOamM1TkRreU16UXlOSDVhVkZOMWJpdElaREY1YkM4NGEwSmFRV2NyUnpCSFdtSi1mZyZjcmVhdGVfdGltZT0xNDI2Nzk0OTU3Jm5vbmNlPTAuNTc0MzAyODY1ODMzNDIyOA==";    var session = OT.initSession(apiKey, sessionId);
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
