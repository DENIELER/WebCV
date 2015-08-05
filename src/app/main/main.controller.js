'use strict';

import Chain from '../services/chain';

class MainCtrl {
  constructor ($scope, $document, $timeout, ScrollManagerService) {
    var self = this;
    
  	self.$document = $document;
    self.$timeout = $timeout;
  	self.$scope = $scope;
    
    self.scrollManager = ScrollManagerService;
    
    var chain = new Chain(this.$scope);
    
    chain.wait('meetAnimationFinished')
    .wait(self.scrollManager.waitForScroll, self.scrollManager)
    .exec(() => { console.log('Fire2'); })
    .wait('skillsAnimationFinished')
    .exec(() => { console.log('Fire3'); })
    .run();
//    .wait('skills')
//    .exec(() => { console.log('Fire2'); });
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
}

MainCtrl.$inject = ['$scope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
