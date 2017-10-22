'use strict';

class MeetDirective {
  constructor ($timeout, MEET_TEXT, ScrollService, StyleUtilsService, TypingService) {

    this.templateUrl = 'app/components/meet/meet.html';
    this.restrict = 'E';
    this.replace = true;

    this.$timeout = $timeout;
    this.scroll = ScrollService;
    this.styleUtils = StyleUtilsService;
    this.typing = TypingService;
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
    const MEET_TEXT = self.MEET_TEXT;
    const { browserHeight } = self.styleUtils.getBrowserSize();

    self.$timeout(
      __ => self.typing.startTyping(MEET_TEXT.text, MEET_TEXT.time, MEET_TEXT.errors, element, self.constants.textareaId), 1000)
      .then(_ => self.showPhotos(element))
      .then(_ => self.scroll.scrollTo('meetTextarea', 20, 500))
      .then(_ => self.showScrollIcon(element))
      .then(_ => self.$scope.$emit(self.constants.events.finish, {
        scrollUpTo: element.prop('clientHeight') - browserHeight + element.prop('offsetTop')
      }));
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

  static directiveFactory($timeout, MEET_TEXT, ScrollService, StyleUtilsService, TypingService){
    MeetDirective.instance = new MeetDirective($timeout, MEET_TEXT, ScrollService, StyleUtilsService, TypingService);
    return MeetDirective.instance;
  }
}

MeetDirective.directiveFactory.$inject = ['$timeout', 'MEET_TEXT', 'ScrollService', 'StyleUtilsService', 'TypingService'];

export default MeetDirective;
