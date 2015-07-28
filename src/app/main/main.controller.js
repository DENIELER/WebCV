'use strict';

class MainCtrl {
  constructor ($scope, $document, $timeout, ScrollManagerService) {
    var self = this;
    
  	self.$document = $document;
    self.$timeout = $timeout;
  	self.$scope = $scope;
    
    self.scrollManager = ScrollManagerService;
    
    self.waitEvent('meetAnimationFinished')
    .waitScrollToElement('skills');
//    .execEvent('startSkillsAnimation')
//    .waitEvent('skillsAnimationFinished')
//    .waitScrollToElement('beginning')
//    .execEvent('startBeginningAnimation')
//    .waitEvent('beginningAnimationFinished')
//    .waitScrollToElement('firstSteps');
    
//    self.$scope.$on('meetAnimationFinished', function () {
//      self.$timeout(() => {
//        self.scrollManager.waitForScroll(() => {
//          console.info('startSkillsAnimation');
//          self.$scope.$broadcast('startSkillsAnimation');
//        });
//      }, 500);
//    });
  }
  
  waitEvent (eventName) {
    var self = this;
    
    function waitScrollToElement (elementId) {
      console.log('Hey! Handler ' + elementId);
      
      handler = function () {
        console.log('Modified handler');
      }
    }
    
    function handler () {
      console.log('Hey!');
      
      waitScrollToElement();
    }
    
    self.$scope.$on(eventName, handler);
    
    return {
      waitScrollToElement: waitScrollToElement
    };
  }
}

MainCtrl.$inject = ['$scope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
