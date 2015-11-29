'use strict';

class ExperienceDirective {
	constructor ($timeout, ScrollService) {

		this.templateUrl = 'app/components/experience/experience.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;
        
        this.scroll = ScrollService;

        this.constants = {
          moduleId: '#experience',
          
          events: {
            start: 'startExperienceAnimation',
						finish: 'experienceAnimationFinished'
          }
        };
  }

  link(scope, element) {
  	var self = ExperienceDirective.instance;
    self.$scope = scope;
    self.element = element;

    self.$scope.$on(self.constants.events.start, function () {

      self.showModule();

      self.$timeout(() => {}, 1000)
        .then(() => self.$scope.$emit(self.constants.events.finish));
    });
  }

  showModule () {
    this.element.css('opacity', '1');
  }

  showBlock (blockElementId) {
    angular.element(blockElementId).css('opacity', '1');
  }

	showScrollIcon (element) {
      var self = this;

      var scrollDownIconContainer = element.find('#experienceScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

	static directiveFactory($timeout, ScrollService){
		ExperienceDirective.instance = new ExperienceDirective($timeout, ScrollService);
		return ExperienceDirective.instance;
	}
}

ExperienceDirective.directiveFactory.$inject = ['$timeout', 'ScrollService'];

export default ExperienceDirective;
