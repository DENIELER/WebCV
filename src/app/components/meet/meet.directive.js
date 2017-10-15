'use strict';

class MeetDirective {
  constructor ($timeout, MEET_TEXT, ScrollService) {

    this.templateUrl = 'app/components/meet/meet.html';
    this.restrict = 'E';
    this.replace = true;

    //use scope inheritance
    // this.scope = { };

    this.$timeout = $timeout;
    this.scroll = ScrollService;
    this.MEET_TEXT = MEET_TEXT;
  }

  link(scope, element) {
    var self = MeetDirective.instance;
    self.$scope = scope;

    self.$timeout(() => self.startTyping(element), 1000)
      .then(() => self.showPhotos(element))
      .then(() => self.scroll.scrollTo('meetTextarea', 20, 500))
      .then(() => self.showScrollIcon(element))
      .then(() => self.$scope.$emit('meetAnimationFinished'));
  }

  calculateAndSetTextareaHeight(textareaElement, textareaText) {
    textareaElement.val(textareaText);
    textareaElement.css('height', '1px');

    const calculatedHeight = textareaElement.prop('scrollHeight');
    textareaElement.css('height', (25 + calculatedHeight) + 'px');
    textareaElement.val(null)
  }

  startTyping (element) {
  	var self = this;

    var MEET_TEXT = self.MEET_TEXT;
    const textArea = element.find('#meetTextarea');

    //reset height of textarea to support multiple devices
    self.calculateAndSetTextareaHeight(textArea, MEET_TEXT.text);

    // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log('Browser height:', browserHeight)

    return new Promise(
      (resolve, reejct) => {
        textArea
        .focus()
        .typetype(MEET_TEXT.text, {
	        t: MEET_TEXT.time,
	        e: MEET_TEXT.errors,

	        callback: _ => {
            console.log('height finish:', textArea.prop('clientHeight'))
	          textArea
	            .attr('readonly', 'readonly');

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

  static directiveFactory($timeout, MEET_TEXT, ScrollService){
    MeetDirective.instance = new MeetDirective($timeout, MEET_TEXT, ScrollService);
    return MeetDirective.instance;
  }
}

MeetDirective.directiveFactory.$inject = ['$timeout', 'MEET_TEXT', 'ScrollService'];

export default MeetDirective;
