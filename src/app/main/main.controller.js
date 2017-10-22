'use strict';

import Sequence from '../../../bower_components/angular-sequence-events/angular-sequence';

class MainCtrl {
  constructor ($scope, $rootScope, $document, $timeout, ScrollManagerService) {
    var self = this;

  	self.$document = $document;
    self.$timeout = $timeout;
    self.$scope = $scope;
    self.$rootScope = $rootScope;

    self.scrollManager = ScrollManagerService;

    var sequence = new Sequence(this.$scope);

    sequence
    .wait('meetAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startTypeformExperienceAnimation')
    .wait('typeformExperienceAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    // .broadcast('startSkillsAnimation')
    // .wait('skillsAnimationFinished')
    // .wait('waitForScroll', self.scrollManager)
    .broadcast('startExperienceAnimation')
    .wait('experienceAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startContactsAnimation')
    .wait('contactsAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .run();
//    .waitScrollToElement('beginning')
//    .execEvent('startBeginningAnimation')
//    .waitEvent('beginningAnimationFinished')
//    .waitScrollToElement('firstSteps');

    self.$scope.$on('contactsAnimationFinished', function () {
      const scrollIcons = document.getElementsByClassName('scroll-icon-container')
      Array.from(scrollIcons).forEach(function(element) {
        element.innerHTML = '';
      });
    });
  }
}

MainCtrl.$inject = ['$scope', '$rootScope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
