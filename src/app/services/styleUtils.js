'use strict';

class StyleUtilsService {
  calculateAndSetTextareaHeight(textareaElement, textareaText) {
    textareaElement.val(textareaText);
    textareaElement.css('height', '1px');

    const calculatedHeight = textareaElement.prop('scrollHeight');
    textareaElement.css('height', (1 + calculatedHeight) + 'px');
    textareaElement.val(null)
  }

  getBrowserSize() {
    var browserWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var browserHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return {browserWidth, browserHeight}
  }
}

StyleUtilsService.$inject = [];

export default StyleUtilsService;
