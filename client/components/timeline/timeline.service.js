'use strict';

angular.module('keystoneApp')
  .service('timeline', function (Speech, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    function TimeLine(){
      var self = this;
      self.params = {
        gender: undefined,
        origin: undefined,
        name: undefined
      };
      self.history = [];
      $http.get('dialog.json').then(function(tree){
        self.tree = tree;
      });

    }

    TimeLine.prototype.get = function(){};
    TimeLine.prototype.set = function(){};
    TimeLine.prototype.next = function(){};



    return TimeLine;

  });
