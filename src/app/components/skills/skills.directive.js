'use strict';

class SkillsDirective {
	constructor ($timeout, SKILLS_TEXT) {

		this.templateUrl = 'app/components/skills/skills.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;
        this.SKILLS_TEXT = SKILLS_TEXT;

        this.constants = {
          moduleId: '#skills',
          textareaId: '#skillsTextarea',
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

    self.$scope.$on(self.constants.events.start, function () {

      self.showSkillsModule();

      self.$timeout(() => self.startTyping(), 1000)
				.then(() => self.startTyping_NET(), 1000)
				.then(() => self.showScrollIcon(element))
				.then(() => self.$scope.$emit(self.constants.events.finish));
    });
  }

  showSkillsModule () {
    this.element.css('opacity', '1');
  }

  startTyping (element) {
    var self = this;

    var SKILLS_TEXT = self.SKILLS_TEXT;

    return new Promise(
      function (resolve, reejct) {
				self.element.find(self.constants.textareaId)
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

	startTyping_NET (element) {
    var self = this;

    var SKILLS_TEXT = self.SKILLS_TEXT;

    return new Promise(
      function (resolve, reejct) {
				self.element.find(self.constants.textarea_net_Id)
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

	showScrollIcon (element) {
      var self = this;

      var scrollDownIconContainer = element.find('#skillsScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

	static directiveFactory($timeout, SKILLS_TEXT){
		SkillsDirective.instance = new SkillsDirective($timeout, SKILLS_TEXT);
		return SkillsDirective.instance;
	}
}

SkillsDirective.directiveFactory.$inject = ['$timeout', 'SKILLS_TEXT'];

export default SkillsDirective;
