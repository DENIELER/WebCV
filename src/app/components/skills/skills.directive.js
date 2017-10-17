'use strict';

class SkillsDirective {
	constructor ($timeout, SKILLS_TEXT, ScrollService, StyleUtilsService) {

		this.templateUrl = 'app/components/skills/skills.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;
        this.SKILLS_TEXT = SKILLS_TEXT;

        this.scroll = ScrollService;
        this.styleUtils = StyleUtilsService;

        this.constants = {
          moduleId: '#skills',
          textareaId: '#skillsTextarea',
          textarea_typeform_description_Id: '#skills-typeform__desc__textarea',
          textarea_otherFrontendSkills_description_Id: '#other-frontend-skills__desc__textarea',

					textarea_net_Id: '#skillsTextarea_Net',

          events: {
            start: 'startSkillsAnimation',
						finish: 'skillsAnimationFinished'
          }
        };
  }

  link(scope, element) {
  	var self = SkillsDirective.instance;
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
        .then(() => self.wait(3000))
        .then(() => self.scroll.scrollTo('other-frontend-skills', 20, 500))
        .then(() => self.showBlock('.other-frontend-skills'))
        .then(() => self.startTyping_otherFrontendSkillsDescription(), 1000)
        // .then(() => self.showBlock('#skills-part-1'))
        // .then(() => self.startTyping_NET(), 1000)
        // .then(() => self.showBlock('#skills-part-2'))
        // .then(() => self.scroll.scrollTo('skills-part-1', 0, 500))
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

    var SKILLS_TEXT = self.SKILLS_TEXT;
    const textArea = self.element.find(self.constants.textareaId);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, SKILLS_TEXT.text);

    return new Promise(
      function (resolve, reejct) {
				textArea
        //.focus()
        .typetype(SKILLS_TEXT.text, {
            t: SKILLS_TEXT.time,
            e: SKILLS_TEXT.errors,

            callback: function () {
                resolve();
            }
        });
      }
    );
  }

	startTyping_NET () {
    var self = this;

    var SKILLS_TEXT = self.SKILLS_TEXT;
    const textArea = self.element.find(self.constants.textarea_net_Id);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, SKILLS_TEXT.text_net);

    return new Promise(
      function (resolve, reejct) {
				textArea
        //.focus()
        .typetype(SKILLS_TEXT.text_net, {
            t: SKILLS_TEXT.time,
            e: SKILLS_TEXT.errors,

            callback: function () {
                resolve();
            }
        });
      }
    );
  }

  startTyping_typeformDescription () {
    var self = this;

    var SKILLS_TEXT = self.SKILLS_TEXT;
    const textArea = self.element.find(self.constants.textarea_typeform_description_Id);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, SKILLS_TEXT.text_typeform);

    return new Promise(
      function (resolve, reejct) {
        textArea
        .typetype(SKILLS_TEXT.text_typeform, {
            t: SKILLS_TEXT.time,
            e: SKILLS_TEXT.errors,

            callback: function () {
                resolve();
            }
        });
      }
    );
  }

  startTyping_otherFrontendSkillsDescription () {
    var self = this;

      var SKILLS_TEXT = self.SKILLS_TEXT;
      const textArea = self.element.find(self.constants.textarea_otherFrontendSkills_description_Id);

      //reset height of textarea to support multiple devices
      self.styleUtils.calculateAndSetTextareaHeight(textArea, SKILLS_TEXT.other_frontend_skills);

      return new Promise(
        function (resolve, reejct) {
          textArea
          .typetype(SKILLS_TEXT.other_frontend_skills, {
              t: SKILLS_TEXT.time,
              e: SKILLS_TEXT.errors,

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

	static directiveFactory($timeout, SKILLS_TEXT, ScrollService, StyleUtilsService){
		SkillsDirective.instance = new SkillsDirective($timeout, SKILLS_TEXT, ScrollService, StyleUtilsService);
		return SkillsDirective.instance;
	}
}

SkillsDirective.directiveFactory.$inject = ['$timeout', 'SKILLS_TEXT', 'ScrollService', 'StyleUtilsService'];

export default SkillsDirective;
