'use strict';

import Sequence from '../../../bower_components/angular-sequence-events/angular-sequence';

class MainCtrl {
  constructor ($scope, $document, $timeout, ScrollManagerService) {
    var self = this;

  	self.$document = $document;
    self.$timeout = $timeout;
  	self.$scope = $scope;

    self.scrollManager = ScrollManagerService;

    var sequence = new Sequence(this.$scope);

    sequence
    .wait('meetAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startSkillsAnimation')
    .wait('skillsAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startExperienceAnimation')
    .wait('experienceAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .run({
      loopLastAction: true
    });
//    .waitScrollToElement('beginning')
//    .execEvent('startBeginningAnimation')
//    .waitEvent('beginningAnimationFinished')
//    .waitScrollToElement('firstSteps');
  }
}

MainCtrl.$inject = ['$scope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
