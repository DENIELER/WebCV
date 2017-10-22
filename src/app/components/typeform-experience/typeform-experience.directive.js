'use strict';

class TypeformExperienceDirective {
	constructor ($timeout, TYPEFORM_TEXT, ScrollService, StyleUtilsService) {
		this.templateUrl = 'app/components/typeform-experience/typeform-experience.html';
    this.restrict = 'E';
    this.replace = true;
    this.scope = {}

    this.$timeout = $timeout;
    this.TYPEFORM_TEXT = TYPEFORM_TEXT;

    this.scroll = ScrollService;
    this.styleUtils = StyleUtilsService;

    this.constants = {
      moduleId: '#typeform-experience',
      textareaId: '#firstTextarea',
      textarea_typeform_description_Id: '#secondTextarea',

      events: {
        start: 'startTypeformExperienceAnimation',
        finish: 'typeformExperienceAnimationFinished'
      }
    };
  }

  link(scope, element) {
  	var self = TypeformExperienceDirective.instance;
    self.$scope = scope;
    self.element = element;
    const { browserHeight } = self.styleUtils.getBrowserSize();

    self.$scope.$on(self.constants.events.start, function () {
      self.showModule();

      self.$timeout(() => self.startTyping(), 1000)
        .then(() => self.showBlock('#skills-typeform'))
        .then(() => self.startTyping_typeformDescription(), 1000)
        .then(() => self.scroll.scrollTo('skills-typeform', 0, 500))
        .then(() => self.showBlock('.skills-typeform__desc__list'))
        .then(() => self.showScrollIcon(element))
        .then(() => self.$scope.$emit(self.constants.events.finish, {
          scrollUpTo: element.prop('clientHeight') - browserHeight + element.prop('offsetTop')
      }));
    });
  }

  showModule () {
    this.element.css('opacity', '1');
  }

  wait (timeSpan) {
    return new Promise(
      function (resolve, reejct) {
        setInterval(resolve, timeSpan);
      }
    );
  }

  startTyping () {
    var self = this;

    var TYPEFORM_TEXT = self.TYPEFORM_TEXT;
    const textArea = self.element.find(self.constants.textareaId);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, TYPEFORM_TEXT.header);

    return new Promise(
      function (resolve, reejct) {
				textArea
        //.focus()
        .typetype(TYPEFORM_TEXT.header, {
            t: TYPEFORM_TEXT.time,
            e: TYPEFORM_TEXT.errors,

            callback: function () {
                resolve();
            }
        });
      }
    );
  }

  startTyping_typeformDescription () {
    var self = this;

    var TYPEFORM_TEXT = self.TYPEFORM_TEXT;
    const textArea = self.element.find(self.constants.textarea_typeform_description_Id);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, TYPEFORM_TEXT.content);

    return new Promise(
      function (resolve, reejct) {
        textArea
        .typetype(TYPEFORM_TEXT.content, {
            t: TYPEFORM_TEXT.time,
            e: TYPEFORM_TEXT.errors,

            callback: function () {
                resolve();
            }
        });
      }
    );
  }

  showBlock (blockElementId) {
    angular.element(blockElementId).css('opacity', '1');
  }

	showScrollIcon (element) {
      var self = this;

      var scrollDownIconContainer = element.find('#skillsScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

	static directiveFactory($timeout, TYPEFORM_TEXT, ScrollService, StyleUtilsService){
		TypeformExperienceDirective.instance = new TypeformExperienceDirective($timeout, TYPEFORM_TEXT, ScrollService, StyleUtilsService);
		return TypeformExperienceDirective.instance;
	}
}

TypeformExperienceDirective.directiveFactory.$inject = ['$timeout', 'TYPEFORM_TEXT', 'ScrollService', 'StyleUtilsService'];

export default TypeformExperienceDirective;
