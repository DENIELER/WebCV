'use strict';

class ChainService {
  constructor ($scope) {
    this.scope = $scope;
    
    this.functions = [];
    this.index = 0;
  }
  
  wait (event, eventTarget) {
    var self = this;
    
    var index = self.index;
    
    if (typeof (event) === "string") {
      self._add(function () {
        self.scope.$on(event, self._exec.bind(self, index + 1))
      });
    } else {
      var eventName = "manualChainEvent_" + (index + 1).toString();
      
      self._add(function () {
        self.scope.$on(eventName, self._exec.bind(self, index + 1))
        
        event.call(eventTarget, function () {
          self.scope.$broadcast(eventName);
        });
      });
    }
    
    return self;
  }
  
  exec (func) {
    var self = this;
    
    self._add(func);
    
    return self;
  }
  
  run () {
    var self = this;
    
    self._exec.call(self, 0);
  }
  
  _add (func, agrs) {
    var self = this;
    
    var args = agrs || [];
    
    self.functions.push({
      f: func,
      arguments: args
    });
    self.index++;
  }
  
  _exec (index) {
    var self = this;
    
    if (self.functions[index]) {
      var func = self.functions[index];
      func.f.apply(self, func.arguments);
    }
  }
}

//ChainService.$inject = ['$scope'];

export default ChainService;