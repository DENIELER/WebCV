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
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startSkillsAnimation')
    .wait('skillsAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startBeginningAnimation')
    .run();
//    .waitScrollToElement('beginning')
//    .execEvent('startBeginningAnimation')
//    .waitEvent('beginningAnimationFinished')
//    .waitScrollToElement('firstSteps');
  }
}

MainCtrl.$inject = ['$scope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
