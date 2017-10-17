'use strict';

class MeetDirective {
  constructor ($timeout, MEET_TEXT, ScrollService, StyleUtilsService) {

    this.templateUrl = 'app/components/meet/meet.html';
    this.restrict = 'E';
    this.replace = true;

    //use scope inheritance
    // this.scope = { };

    this.$timeout = $timeout;
    this.scroll = ScrollService;
    this.styleUtils = StyleUtilsService;
    this.MEET_TEXT = MEET_TEXT;

    this.constants = {
      textareaId: '#meetTextarea',
      events: {
        finish: 'meetAnimationFinished'
      }
    };
  }

  link(scope, element) {
    var self = MeetDirective.instance;
    self.$scope = scope;
    const { browserHeight } = self.styleUtils.getBrowserSize();

    self.$timeout(() => self.startTyping(element), 1000)
      .then(() => self.showPhotos(element))
      .then(() => self.scroll.scrollTo('meetTextarea', 20, 500))
      .then(() => self.showScrollIcon(element))
      .then(() => self.$scope.$emit(self.constants.events.finish, {
        scrollUpTo: element.prop('clientHeight') - browserHeight + element.prop('offsetTop')
      }));
  }

  startTyping (element) {
  	var self = this;

    var MEET_TEXT = self.MEET_TEXT;
    const textArea = element.find(self.constants.textareaId);

    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, MEET_TEXT.text);

    return new Promise(
      (resolve, reejct) => {
        textArea
          .focus()
          .typetype(MEET_TEXT.text, {
            t: MEET_TEXT.time,
            e: MEET_TEXT.errors,

            callback: _ => {
              textArea.attr('readonly', 'readonly');

              resolve();
            }
        });
      }
    );
  }

  showPhotos (element) {
    var self = this;

    var firstPhoto = element.find('#photo1');

    firstPhoto
    .css('opacity', '1');
  }

  showScrollIcon (element) {
      var self = this;

      var scrollDownIconContainer = element.find('#meetScrollIcon');
      scrollDownIconContainer
      	.css('opacity', '1');
  }

  static directiveFactory($timeout, MEET_TEXT, ScrollService, StyleUtilsService){
    MeetDirective.instance = new MeetDirective($timeout, MEET_TEXT, ScrollService, StyleUtilsService);
    return MeetDirective.instance;
  }
}

MeetDirective.directiveFactory.$inject = ['$timeout', 'MEET_TEXT', 'ScrollService', 'StyleUtilsService'];

export default MeetDirective;
