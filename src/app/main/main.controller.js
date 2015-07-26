'use strict';

class MainCtrl {
  constructor ($scope, $document, $timeout, ScrollManagerService) {
    var self = this;
    
  	self.$document = $document;
    self.$timeout = $timeout;
  	self.$scope = $scope;
    
    self.scrollManager = ScrollManagerService;
    
    self.$scope.$on('meetAnimationFinished', function () {
      self.$timeout(() => {
        self.scrollManager.waitForScroll(() => {
          console.info('startSkillsAnimation');
          self.$scope.$broadcast('startSkillsAnimation');
        });
      }, 500);
    });
  }
}

MainCtrl.$inject = ['$scope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
