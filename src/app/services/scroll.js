'use strict';

class ScrollService {

	constructor ($document, $timeout, $window) {
		this.$document = $document;
        this.$timeout = $timeout;
        this.$window = $window;

		this.duration = 700;
        this.scrollBlocked = false;
      
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
    } 

	scrollTo (elementId, offset, duration) {
		var self = this;

        if (!self.scrollBlocked) {
        	var offset = offset || 0;
            var duration = duration || self.duration;

            self.scrollBlocked = true;
            
            self.$timeout(() => { self.scrollBlocked = false; }, 1000);
        	var scrollElement = angular.element(self.$document.context.getElementById(elementId));
        	return self.$document.scrollToElementAnimated(scrollElement, offset, duration, function (t) { return t*t*t })
                .then(() => self.$timeout(() => { self.scrollBlocked = false; }, 300));
        }
    }

    scrollTop (duration) {
    	var self = this;
        
        if (!self.scrollBlocked) {
            var duration = duration || self.duration;

            self.scrollBlocked = true;

            self.$timeout(() => { self.scrollBlocked = false; }, 1000);
            return self.$document.scrollToAnimated(0, 0, duration, function (t) { return t*t*t })
                .then(() => self.$timeout(() => { self.scrollBlocked = false; }, 300));
        }
    }
  
    getScrollTop () {
      return this.$document.scrollTop();
    }
  
    onScroll (eventHandler) {
      this.$document.bind('scroll', eventHandler);
    }
  
    removeScrollHandler () {
      this.$document.unbind('scroll');
    }
  
    preventScroll () {
      if (this.$window.addEventListener) // older FF
        this.$window.addEventListener('DOMMouseScroll', this._preventDefault.bind(this), false);
      this.$window.onwheel = this._preventDefault.bind(this); // modern standard
      this.$window.onmousewheel = this.$document.context.onmousewheel = this._preventDefault.bind(this); // older browsers, IE
      this.$window.ontouchmove  = this._preventDefault.bind(this); // mobile
      this.$document.context.onkeydown  = this._preventDefaultForScrollKeys.bind(this);
    }
  
    allowScroll () {
      if (this.$window.removeEventListener)
        this.$window.removeEventListener('DOMMouseScroll', this._preventDefault.bind(this), false);
      this.$window.onmousewheel = this.$document.context.onmousewheel = null; 
      this.$window.onwheel = null; 
      this.$window.ontouchmove = null;  
      this.$document.context.onkeydown = null;  
      
      console.log('Allowed scroll');
    }
  
    //private
    _preventDefault(e) {
      e = e || this.$window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;  
    }
  
    _preventDefaultForScrollKeys(e) {
      if (this.keys[e.keyCode]) {
        this._preventDefault(e);
        return false;
      }
    }
}

ScrollService.$inject = ['$document', '$timeout', '$window'];

export default ScrollService;