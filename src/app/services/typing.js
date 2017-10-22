'use strict';

class TypingService {
  constructor (StyleUtilsService) {
    var self = this;

    self.styleUtils = StyleUtilsService;
  }

  startTyping (text, time, errors, element, textareaId) {
    const self = this;
    const textArea = element.find(textareaId);
    //reset height of textarea to support multiple devices
    self.styleUtils.calculateAndSetTextareaHeight(textArea, text);

    return new Promise(
      function (resolve, reejct) {
        textArea
        .typetype(text, {
            t: time,
            e: errors,

            callback: function () {
                textArea.attr('readonly', 'readonly');
                resolve();
            }
        });
      }
    );
  }
}

TypingService.$inject = ['StyleUtilsService'];

export default TypingService;
