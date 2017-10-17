'use strict';

class ScrollService {

	constructor ($document, $timeout, $window, ScrollDirection) {
		this.$document = $document;
    this.$timeout = $timeout;
    this.$window = $window;

    this.scrollDirection = ScrollDirection;

		this.duration = 700;
    this.scrollBlocked = false;

    this.scrollDelta = 0;

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    this.keys = {37: 1, 38: 1, 39: 1, 40: 1};

    this.downScrollKeys = {40: 1, 34: 1};
    this.upScrollKeys = {38: 1, 33: 1};
  }

	scrollTo (elementId, offset, duration) {
		var self = this;

    // if (!self.scrollBlocked) {
    	var offset = offset || 0;
      var duration = duration || self.duration;

      self.scrollBlocked = true;

      self.$timeout(() => { self.scrollBlocked = false; }, 1000);
    	var scrollElement = angular.element(self.$document.context.getElementById(elementId));
    	return self.$document.scrollToElementAnimated(scrollElement, offset, duration, function (t) { return t*t*t })
            .then(() => self.$timeout(() => { self.scrollBlocked = false; }, 300));
    // }
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

  addScrollHandler (eventHandler) {
    this.$document.bind('scroll', eventHandler);
  }

  removeScrollHandler () {
    this.$document.unbind('scroll');
  }

  preventScroll () {
    if (this.$window.addEventListener) // older FF
      this.$window.addEventListener('DOMMouseScroll', this._preventDefault.bind(this), false);

    if (this.$window.removeEventListener) // older FF
      this.$window.removeEventListener('DOMMouseScroll', this._scrollHandler.bind(this), false);

    this.$window.onwheel = this._preventDefault.bind(this); // modern standard
    this.$window.onmousewheel = this.$document.context.onmousewheel = this._preventDefault.bind(this); // older browsers, IE
    this.$window.ontouchmove  = this._preventDefault.bind(this); // mobile
    this.$document.context.onkeydown  = this._preventDefaultForScrollKeys.bind(this);

    console.log('Scroll: Prevented scroll');
  }

  allowScroll (topScrollLimit, bottomScrollLimit) {
    if (this.$window.removeEventListener) // older FF
      this.$window.removeEventListener('DOMMouseScroll', this._preventDefault.bind(this), false);

    if (this.$window.addEventListener) // older FF
      this.$window.addEventListener('DOMMouseScroll', this._scrollHandler.bind(this, topScrollLimit, bottomScrollLimit), false);

    this.$window.onmousewheel = this.$document.context.onmousewheel = this._scrollHandler.bind(this, topScrollLimit, bottomScrollLimit);
    this.$window.onwheel = null;
    this.$window.ontouchmove = null;
    this.$document.context.onkeydown = this._scrollHandlerForScrollKeys.bind(this, topScrollLimit, bottomScrollLimit);

    console.log('Scroll: Allowed scroll');
  }

  getScrollDirection () {
    var direction;

    if (this.scrollDelta > 0) {
      direction = this.scrollDirection.up;
    } else {
      direction = this.scrollDirection.down;
    }

    console.info('Scroll: Scroll direction: ' + direction);

    return direction;
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

  _scrollHandler (topScrollLimit, bottomScrollLimit, e) {
    var self = this;

    if (!e) /* For IE. */
      e = self.$window.event;

    var scrollTop = window.scrollY;
    if (scrollTop <= topScrollLimit || scrollTop >= bottomScrollLimit) {
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    if (!self.scrollBlocked) {
      var delta;
      if (e.wheelDelta) { /* IE/Opera. */
          delta = e.wheelDelta/120;
      } else if (event.detail) { /** Mozilla case. */
          /** In Mozilla, sign of delta is different than in IE.
           * Also, delta is multiple of 3.
           */
          delta = -e.detail/3;
      }
      self.scrollDelta = delta;

      self.$document.scroll();

      self.$timeout(() => {
        self.scrollBlocked = false;
      }, 300);
    }

    self.scrollBlocked = true;
  }

  _scrollHandlerForScrollKeys (e) {
    var self = this;

    self._preventDefault(e);

    if (!self.scrollBlocked) {
      if (self.downScrollKeys[e.keyCode]) {
        self.scrollDelta = -1;
      } else if (this.upScrollKeys[e.keyCode]) {
        self.scrollDelta = 1;
      } else {
				return;
			}

      self.$document.scroll();

      self.$timeout(() => {
        self.scrollBlocked = false;
      }, 300);
    }

    self.scrollBlocked = true;

    return false;
  }
}

ScrollService.$inject = ['$document', '$timeout', '$window', 'ScrollDirection'];

export default ScrollService;
