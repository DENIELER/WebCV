'use strict';

class ScrollManager { 
  constructor (ScrollService, ScrollDirection, $timeout) {
    var self = this;
    
    self.$timeout = $timeout;
    
    self.scroll = ScrollService;
    self.scrollDirection = ScrollDirection;
    
    self.lastScrollPos = 0;
    self.scrollAction = false;
  }
  
  waitForScroll (callback) {
    var self = this;
    
    self._updateCurrentScrollPos();
    
    self.scroll.allowScroll();
    
    self._bindScroll(callback);
  }
  
  scrollSkillsModuleHandler (callback, e) {
  	var self = this;
    
    console.info('Scroll event');
    
    self.scroll.preventScroll();
    self._unbindScroll();
    
    var scrollDirection = self._getScrollDirection();

    if (scrollDirection === self.scrollDirection.up) {
      
      self.scroll.scrollTop()
      .then(self._bindScroll.bind(self, callback))
      .then(() => { 
        self._updateCurrentScrollPos();
        self.scroll.allowScroll();
      });
      
    } else {
      
      self.scroll.scrollTo('skills', 15, 1500)
      .then(() => callback());
      
    }
  }
 
  _bindScroll (callback) {
    var eventHandler = this.scrollSkillsModuleHandler.bind(this, callback);
    this.scroll.onScroll(eventHandler);
  }
  
  _unbindScroll () {
    this.scroll.removeScrollHandler();
  }
  
  _updateCurrentScrollPos () {
    this.lastScrollPos = this.scroll.getScrollTop();
  }
  
  _getScrollDirection () {
    var direction;
    
    var currentScrollPos = this.scroll.getScrollTop();
    
    if (currentScrollPos < this.lastScrollPos) {
      direction = this.scrollDirection.up;
    } else {
      direction = this.scrollDirection.down;
    }
    
  	this.lastScrollPos = currentScrollPos;
    
    console.info('Scroll direction: ' + direction);
    
    return direction;
  }
}

ScrollManager.$inject = ['ScrollService', 'ScrollDirection', '$timeout'];

export default ScrollManager;