'use strict';

class ExperienceDirective {
	constructor ($timeout, ScrollService, EXPERIENCE_TEXT, StyleUtilsService, TypingService) {

		this.templateUrl = 'app/components/experience/experience.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;

        this.scroll = ScrollService;
        this.styleUtils = StyleUtilsService;
        this.typing = TypingService;

        this.EXPERIENCE_TEXT = EXPERIENCE_TEXT;

        this.constants = {
          moduleId: '#experience',

          experienceText: '#experienceTextarea',
          job1IdHeader: '#job1-header',
          job1IdDescription: '#job1-description',
          job2IdHeader: '#job2-header',
          job2IdDescription: '#job2-description',
          job3IdHeader: '#job3-header',
          job3IdDescription: '#job3-description',
          job4IdHeader: '#job4-header',
          job4IdDescription: '#job4-description',

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

    const { browserHeight } = self.styleUtils.getBrowserSize();

    self.$scope.$on(self.constants.events.start, function () {
      self.showModule();

      var EXPERIENCE_TEXT = self.EXPERIENCE_TEXT;

      self.$timeout(
        _ => self.typing.startTyping(EXPERIENCE_TEXT.text, EXPERIENCE_TEXT.time, EXPERIENCE_TEXT.errors, self.element, self.constants.experienceText), 1000)
        .then(_ => self.typeJob(EXPERIENCE_TEXT.job1_header, EXPERIENCE_TEXT.job1_description, self.constants.job1IdHeader, self.constants.job1IdDescription))
        .then(_ => self.typeJob(EXPERIENCE_TEXT.job2_header, EXPERIENCE_TEXT.job2_description, self.constants.job2IdHeader, self.constants.job2IdDescription))
        .then(_ => self.typeJob(EXPERIENCE_TEXT.job3_header, EXPERIENCE_TEXT.job3_description, self.constants.job3IdHeader, self.constants.job3IdDescription))
        .then(_ => self.typeJob(EXPERIENCE_TEXT.job4_header, EXPERIENCE_TEXT.job4_description, self.constants.job4IdHeader, self.constants.job4IdDescription))
        .then(_ => self.showScrollIcon(element))
        .then(_ => self.$scope.$emit(self.constants.events.finish, {
          scrollUpTo: element.prop('clientHeight') - browserHeight + element.prop('offsetTop')
        }));
    });
  }

  typeJob (jobHeader, jobDescription, jobHeaderElementId, jobDescriptionElementId) {
    var self = this;

    var EXPERIENCE_TEXT = self.EXPERIENCE_TEXT;
    const job1HeaderPromise = self.typing.startTyping(jobHeader, EXPERIENCE_TEXT.time, EXPERIENCE_TEXT.errors, self.element, jobHeaderElementId)
    const job1DescriptionPromise = self.typing.startTyping(jobDescription, EXPERIENCE_TEXT.time, EXPERIENCE_TEXT.errors, self.element, jobDescriptionElementId)

    return Promise.all([job1HeaderPromise, job1DescriptionPromise]);
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

	static directiveFactory($timeout, ScrollService, EXPERIENCE_TEXT, StyleUtilsService, TypingService){
		ExperienceDirective.instance = new ExperienceDirective($timeout, ScrollService, EXPERIENCE_TEXT, StyleUtilsService, TypingService);
		return ExperienceDirective.instance;
	}
}

ExperienceDirective.directiveFactory.$inject = ['$timeout', 'ScrollService', 'EXPERIENCE_TEXT', 'StyleUtilsService', 'TypingService'];

export default ExperienceDirective;
