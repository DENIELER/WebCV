'use strict';

class ScrollManager {
  constructor (ScrollService, $timeout, ScrollDirection) {
    var self = this;

    self.$timeout = $timeout;

    self.scroll = ScrollService;
    self.scrollDirection = ScrollDirection;
  }

  waitForScroll (callback) {
    var self = this;

    self.scroll.allowScroll();

    self._bindScroll(callback);
  }

  scrollSkillsModuleHandler (callback, e) {
  	this.scroll.preventScroll();

    var self = this;

    console.info('ScrollManager: Scroll event');

    self._unbindScroll();

    var scrollDirection = self.scroll.getScrollDirection();

    if (scrollDirection === self.scrollDirection.up) {

      self.scroll.scrollTop()
      .then(self._bindScroll.bind(self, callback))
      .then(() => {
        self.scroll.allowScroll();
      });

    } else {

      self.scroll.scrollTo('skills', 15, 1500)
      .then(() => callback());

    }
  }

  _bindScroll (callback) {
    var eventHandler = this.scrollSkillsModuleHandler.bind(this, callback);
    this.scroll.addScrollHandler(eventHandler);
  }

  _unbindScroll () {
    this.scroll.removeScrollHandler();
  }
}

ScrollManager.$inject = ['ScrollService', '$timeout', 'ScrollDirection'];

export default ScrollManager;
