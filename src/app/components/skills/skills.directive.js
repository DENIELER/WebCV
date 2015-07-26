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
          
          events: {
            start: 'startSkillsAnimation'
          }
        };
    } 

    link(scope, element) { 
    	var self = SkillsDirective.instance;
        self.$scope = scope;
        self.element = element;
        
        self.$scope.$on(self.constants.events.start, function () {
          
          self.showSkillsModule();
          
          self.$timeout(() => self.startTyping(), 1000);
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

	static directiveFactory($timeout, SKILLS_TEXT){
		SkillsDirective.instance = new SkillsDirective($timeout, SKILLS_TEXT);
		return SkillsDirective.instance;
	}
}

SkillsDirective.directiveFactory.$inject = ['$timeout', 'SKILLS_TEXT'];

export default SkillsDirective;