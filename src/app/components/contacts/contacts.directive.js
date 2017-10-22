'use strict';

class ContactsDirective {
	constructor ($timeout, ScrollService, StyleUtilsService, CONTACTS_TEXT) {

		this.templateUrl = 'app/components/contacts/contacts.html';
        this.restrict = 'E';
        this.replace = true;
        this.scope = {}

        this.$timeout = $timeout;

        this.scroll = ScrollService;
        this.styleUtils = StyleUtilsService;

        this.CONTACTS_TEXT = CONTACTS_TEXT;

        this.constants = {
          moduleId: '#contacts',
          contactsTextarea: '#contactsTextarea',

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

    const { browserHeight } = self.styleUtils.getBrowserSize();

    self.$scope.$on(self.constants.events.start, function () {
      self.showModule();

      self.$timeout(() => self.startTyping(), 1000)
        .then(() => self.showBlock('#contacts-card'))
        .then(() => self.showBlock('#greetings'))
        .then(() => self.$scope.$emit(self.constants.events.finish, {
          scrollUpTo: element.prop('clientHeight') - browserHeight + element.prop('offsetTop')
        }));
    });
  }

  showModule () {
    this.element.css('opacity', '1');
  }

  showBlock (blockElementId) {
    angular.element(blockElementId).css('opacity', '1');
  }

  startTyping (element) {
    var self = this;

    var CONTACTS_TEXT = self.CONTACTS_TEXT;
    const textArea = self.element.find(self.constants.contactsTextarea);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, CONTACTS_TEXT.text);

    return new Promise(
      function (resolve, reejct) {
        textArea
        .typetype(CONTACTS_TEXT.text, {
            t: CONTACTS_TEXT.time,
            e: CONTACTS_TEXT.errors,

            callback: function () {
              textArea.attr('readonly', 'readonly');
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

      var scrollDownIconContainer = element.find('#contactsScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

	static directiveFactory($timeout, ScrollService, StyleUtilsService, CONTACTS_TEXT){
		ContactsDirective.instance = new ContactsDirective($timeout, ScrollService, StyleUtilsService, CONTACTS_TEXT);
		return ContactsDirective.instance;
	}
}

ContactsDirective.directiveFactory.$inject = ['$timeout', 'ScrollService', 'StyleUtilsService', 'CONTACTS_TEXT'];

export default ContactsDirective;
