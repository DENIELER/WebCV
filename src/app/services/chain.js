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

    if (!eventTarget) {
      self._add(function WaitEvent() {
        self.scope.$on(event, self._exec.bind(self, index + 1))
      }, 'wait');
    } else {
      var eventName = "manualChainEvent_" + (index + 1).toString();

      self._add(function WaitInnerEvent() {
        self.scope.$on(eventName, self._exec.bind(self, index + 1))

        eventTarget[event].call(eventTarget, function InnerEventCallback() {
          console.log('Chain: Broadcast inner event ' + eventName);

          self.scope.$broadcast(eventName);
        });
      }, 'wait');
    }

    return self;
  }

  exec (func) {
    var self = this;

    self._add(func, 'exec');

    return self;
  }

  broadcast (event) {
    var self = this;

    self._add(function BroadCast(){
      self.scope.$broadcast(event);
    }, 'broadcast');

    return self;
  }

  run () {
    var self = this;

    self._exec.call(self, 0);
  }

  _add (func, type, agrs) {
    var self = this;

    var args = agrs || [];

    self.functions.push({
      f: func,
      type: type,
      arguments: args,
      name: func.name
    });
    self.index++;
  }

  _exec (index) {
    var self = this;

    if (self.functions[index]) {
      var func = self.functions[index];

      console.log('Chain: Executing function: ' + (func.name ? func.name : '{Anonymous function}'));

      func.f.apply(self, func.arguments);

      if ((func.type === 'exec' || func.type === 'broadcast') && self.functions[index + 1])
      {
        self._exec(index + 1);
      }
    } else {
      console.error('Chain: You are trying to execute not existing function.' +
      'After "wait" functions should be "exec"');
    }
  }
}

export default ChainService;
