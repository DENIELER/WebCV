'use strict';

const BLOCKING_SCROLL_TIME = 100
const ALLOWED_BOTTOM_SCROLL_BOUNCE = 50
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

      self.$timeout(() => { self.scrollBlocked = false; }, BLOCKING_SCROLL_TIME);
    	var scrollElement = angular.element(self.$document.context.getElementById(elementId));
    	return self.$document.scrollToElementAnimated(scrollElement, offset, duration, function (t) { return t*t*t })
            .then(() => self.$timeout(() => { self.scrollBlocked = false; }, BLOCKING_SCROLL_TIME));
    // }
  }

  scrollTop (duration) {
  	var self = this;

    if (!self.scrollBlocked) {
      var duration = duration || self.duration;

      self.scrollBlocked = true;

      self.$timeout(() => { self.scrollBlocked = false; }, BLOCKING_SCROLL_TIME);
      return self.$document.scrollToAnimated(0, 0, duration, function (t) { return t*t*t })
          .then(() => self.$timeout(() => { self.scrollBlocked = false; }, BLOCKING_SCROLL_TIME));
    }
  }

  getScrollTop () {
    return this.$document.scrollTop();
  }

  addScrollHandler (eventHandler) {
    if (this.$window.addEventListener) // older FF
    {
      this.$window.addEventListener('scroll', eventHandler, false);
    }
    // this.$document.bind('scroll', eventHandler);
  }

  removeScrollHandler (eventHandler) {
    if (this.$window.removeEventListener) // older FF
    {
      this.$window.removeEventListener('scroll', eventHandler, false);
    }
    // this.$document.unbind('scroll');
  }

  preventScroll () {
    if (this.$window.removeEventListener) // older FF
    {
      this.$window.removeEventListener('DOMMouseScroll', this.onScrollEventHandler, false);
      this.$window.removeEventListener('touchstart', this.onTouchStartEventHandler, false);
      this.$window.removeEventListener('touchmove', this.onScrollEventHandler, false);
      this.$window.removeEventListener('wheel', this.onScrollEventHandler, false);
      // this.$window.removeEventListener('mousewheel', this._scrollHandler, false);
      // this.$document.context.removeEventListener('mousewheel', this._scrollHandler, false);
      this.$document.context.removeEventListener('keydown', this.onScrollForKeysHandler, false);
    }

    if (this.$window.addEventListener) // older FF
    {
      this.onPreventDefaultHandlers = this._preventDefault.bind(this);
      this.onPreventDefaultForKeysHandlers = this._preventDefaultForScrollKeys.bind(this);

      this.$window.addEventListener('DOMMouseScroll', this.onPreventDefaultHandlers, false);
      this.$window.addEventListener('touchstart', this.onPreventDefaultHandlers, false);
      this.$window.addEventListener('touchmove', this.onPreventDefaultHandlers, false);
      this.$window.addEventListener('wheel', this.onPreventDefaultHandlers, false);
      // this.$window.addEventListener('mousewheel', this._preventDefault.bind(this), false);
      // this.$document.context.addEventListener('mousewheel', this._preventDefault.bind(this), false);
      this.$document.context.addEventListener('keydown', this.onPreventDefaultForKeysHandlers, false);
    }

    console.log('Scroll: Prevented scroll');
  }

  allowScroll (topScrollLimit, bottomScrollLimit) {
    if (this.$window.removeEventListener) // older FF
    {
      this.$window.removeEventListener('DOMMouseScroll', this.onPreventDefaultHandlers, false);
      this.$window.removeEventListener('touchstart', this.onPreventDefaultHandlers, false);
      this.$window.removeEventListener('touchmove', this.onPreventDefaultHandlers, false);
      this.$window.removeEventListener('wheel', this.onPreventDefaultHandlers, false);
      // this.$window.removeEventListener('mousewheel', this._preventDefault, false);
      // this.$document.context.removeEventListener('mousewheel', this._preventDefault, false);
      this.$document.context.removeEventListener('keydown', this.onPreventDefaultForKeysHandlers, false);
    }

    if (this.$window.addEventListener) // older FF
    {
      this.onScrollEventHandler = this._scrollHandler.bind(this, topScrollLimit, bottomScrollLimit);
      this.onTouchStartEventHandler = this._touchStartHandler.bind(this, topScrollLimit, bottomScrollLimit);
      this.onScrollForKeysHandler = this._scrollHandlerForScrollKeys.bind(this, topScrollLimit, bottomScrollLimit);

      this.$window.addEventListener('DOMMouseScroll', this.onScrollEventHandler, false);
      this.$window.addEventListener('touchstart', this.onTouchStartEventHandler, false);
      this.$window.addEventListener('touchmove', this.onScrollEventHandler, false);
      this.$window.addEventListener('wheel', this.onScrollEventHandler, false);
      // this.$window.addEventListener('mousewheel', scrollEventHandler, false);
      // this.$document.context.addEventListener('mousewheel', scrollEventHandler, false);
      this.$document.context.addEventListener('keydown', this.onScrollForKeysHandler, false);
    }

    console.log('Scroll: Allowed scroll');
  }

  getScrollDirection () {
    var direction;

    if (this.scrollDelta >= 0) {
      direction = this.scrollDirection.up;
    } else {
      direction = this.scrollDirection.down;
    }

    return direction;
  }

  //private
  _preventDefault(e) {
    try {
      e = e || this.$window.event;
      if (e.preventDefault)
        e.preventDefault();

      if (e.returnValue)
        e.returnValue = false;
    } catch (e) {
      console.log('Scroll: _preventDefault method. Error:', e)
    }
  }

  _preventDefaultForScrollKeys(e) {
    if (this.keys[e.keyCode]) {
      this._preventDefault(e);
      return false;
    }
  }

  _scrollHandler (topScrollLimit, bottomScrollLimit, e) {
    var self = this;

    const scrollTop = window.scrollY;
    const scrollDirection = self.getScrollDirection();
    // if (scrollTop > bottomScrollLimit + ALLOWED_BOTTOM_SCROLL_BOUNCE) {
    //   console.log('Scroll. Blocked module handler:', topScrollLimit, bottomScrollLimit, scrollTop)
    //   self.$document.scroll();
    //   e.preventDefault();
    //   e.stopPropagation();
    //   return;
    // }

    if (!e) /* For IE. */
      e = self.$window.event;

    if (
      // (scrollTop <= topScrollLimit && scrollDirection === self.scrollDirection.up)
      // ||
      (scrollTop >= bottomScrollLimit && scrollDirection === self.scrollDirection.down)) {
      //to make mouse experience better immediatly change direction
      self.scrollDelta = 1;
      if (e.preventDefault)
        e.preventDefault();
      if (e.returnValue)
        e.returnValue = false;
    } else {
      var delta;
      if (e.wheelDelta) { /* IE/Opera. */
          delta = e.wheelDelta/120;
      } else if (e.detail) { /** Mozilla case. */
          /** In Mozilla, sign of delta is different than in IE.
           * Also, delta is multiple of 3.
           */
          delta = -e.detail/3;
      } else if (e.touches || (e.originalEvent && e.originalEvent.touches)) {
        const moveEndTouchPosition = e.touches
          ? e.touches[0].clientY
          : e.originalEvent.touches[0].clientY;
        delta = (moveEndTouchPosition - self.moveStartTouchPosition)/120;
      }
      self.scrollDelta = delta;
    }

    if (!self.scrollBlocked) {
      self.$document.scroll();

      self.$timeout(() => {
        self.scrollBlocked = false;
      }, 50);
    }

    self.scrollBlocked = true;
  }

  _touchStartHandler (topScrollLimit, bottomScrollLimit, e) {
    var self = this;

    self.moveStartTouchPosition = e.touches
      ? e.touches[0].clientY
      : e.originalEvent.touches[0].clientY;
  }

  _scrollHandlerForScrollKeys (topScrollLimit, bottomScrollLimit, e) {
    var self = this;
    var scrollTop = window.scrollY;
    const scrollDirection = self.getScrollDirection();

    if (
      // (scrollTop <= topScrollLimit && scrollDirection === self.scrollDirection.up)
      // ||
      (scrollTop >= bottomScrollLimit && scrollDirection === self.scrollDirection.down)) {
      //to make mouse experience better immediatly change direction
      self.scrollDelta = 1;
      self._preventDefault(e);
    }

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
      }, 50);
    }

    self.scrollBlocked = true;

    return false;
  }
}

ScrollService.$inject = ['$document', '$timeout', '$window', 'ScrollDirection'];

export default ScrollService;
