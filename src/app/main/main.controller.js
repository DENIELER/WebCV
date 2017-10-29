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
    .broadcast('startExperienceAnimation')
    .wait('experienceAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .broadcast('startContactsAnimation')
    .wait('contactsAnimationFinished')
    .wait('waitForScroll', self.scrollManager)
    .run();

    self.$scope.$on('contactsAnimationFinished', _ => {
      // const scrollIcons = document.getElementsByClassName('scroll-icon-container')
      const scrollIcons = document.getElementsByClassName('icon-circle-down')
      Array.from(scrollIcons).forEach(element => {
        element.innerHTML = '';
      });

      window.setTimeout(_ => {
        const scrollIconContainers = document.getElementsByClassName('scroll-icon-container')
        Array.from(scrollIconContainers).forEach(element => {
          element.style.height = '50px';
        });
      }, 1000)
    });
  }
}

MainCtrl.$inject = ['$scope', '$rootScope', '$document', '$timeout', 'ScrollManagerService'];

export default MainCtrl;
