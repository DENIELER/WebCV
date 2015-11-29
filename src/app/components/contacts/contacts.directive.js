'use strict';

class ContactsDirective {
	constructor ($timeout, ScrollService) {

		this.templateUrl = 'app/components/contacts/contacts.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;
        
        this.scroll = ScrollService;

        this.constants = {
          moduleId: '#contacts',
          textareaId: '#skillsTextarea',
				
          events: {
            start: 'startContactsAnimation',
						finish: 'contactsAnimationFinished'
          }
        };
  }

  link(scope, element) {
  	var self = ContactsDirective.instance;
    self.$scope = scope;
    self.element = element;

    self.$scope.$on(self.constants.events.start, function () {
      self.showModule();

      self.$timeout(() => self.startTyping(), 1000)
        // .then(() => self.showScrollIcon(element))
    		.then(() => self.$scope.$emit(self.constants.events.finish));
    });
  }

  showModule () {
    this.element.css('opacity', '1');
  }

  startTyping (element) {
    var self = this;

    // return new Promise(
    //   function (resolve, reejct) {
				// self.element.find(self.constants.textareaId)
    //     .typetype(SKILLS_TEXT.text, {
    //         t: SKILLS_TEXT.time,
    //         e: SKILLS_TEXT.errors,

    //         callback: function () {
    //             resolve();
    //         }
    //     });
    //   }
    // );
    return Promise.resolve();
  }

  showBlock (blockElementId) {
    angular.element(blockElementId).css('opacity', '1');
  }

	showScrollIcon (element) {
      var self = this;

      var scrollDownIconContainer = element.find('#contactsScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

	static directiveFactory($timeout, ScrollService){
		ContactsDirective.instance = new ContactsDirective($timeout, ScrollService);
		return ContactsDirective.instance;
	}
}

ContactsDirective.directiveFactory.$inject = ['$timeout', 'ScrollService'];

export default ContactsDirective;
