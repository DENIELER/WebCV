'use strict';

class ScrollManager {
  constructor (ScrollService, $timeout, ScrollDirection) {
    var self = this;

    self.$timeout = $timeout;

    self.scroll = ScrollService;
    self.scrollDirection = ScrollDirection;
  }

  init () {
    var self = this;

    self.sections = self._getSectionPositions();
    self.nextSection = self.sections[1];
  }

  waitForScroll (callback, scrollUpTo) {
    console.log('Arguments', scrollUpTo)
    var self = this;

    document.body.style.overflow = 'auto';

    self.scroll.allowScroll(-2, scrollUpTo);

    self._bindScroll(-2, scrollUpTo, callback);
  }

  scrollModuleHandler (topScrollLimit, bottomScrollLimit, callback, e) {
    var scrollTop = window.scrollY;

    if (scrollTop > topScrollLimit && scrollTop < bottomScrollLimit) {
      console.log('Blocked module handler:', topScrollLimit, bottomScrollLimit, scrollTop)
      return;
    }

    const self = this;
    const isLastSection = self._isLastSection(scrollTop, self.sections)
    if (isLastSection) {
      console.log('Last section detected. Scroll events are not firing.')
      return;
    }

    console.log('Passed event:', scrollTop, e, bottomScrollLimit)

    document.body.style.overflow = '';
  	this.scroll.preventScroll();

    console.info('ScrollManager: Scroll event');

    self._unbindScroll();

    var scrollDirection = self.scroll.getScrollDirection();

    // if (scrollDirection === self.scrollDirection.up) {
    //   self._scrollTop()
    //   .then(self._bindScroll.bind(self, callback))
    //   .then(() => {
    //     self.scroll.allowScroll();
    //   });
    // } else {

    const currentScrollPosition = self.scroll.getScrollTop();
    var scrollToSection = self._getScrollToSection(currentScrollPosition, self.sections);
    if (scrollToSection)
    {
      if (self.nextSection && scrollToSection.element === self.nextSection.element) {
        self._scrollToElement(scrollToSection)
        .then(() => callback());

        self._setNextSection(scrollToSection, self.sections);
      } else {
        self._scrollToElement(scrollToSection)
        .then(self._bindScroll.bind(self, callback))
        .then(() => {
          self.scroll.allowScroll();
        });
      }
    } else {
      Promise.resolve()
      .then(self._bindScroll.bind(self, callback))
      .then(() => {
        self.scroll.allowScroll();
      });
    }
    // }
  }

  _bindScroll (topScrollLimit, bottomScrollLimit, callback) {
    var eventHandler = this.scrollModuleHandler.bind(this, topScrollLimit, bottomScrollLimit, callback);
    this.scroll.addScrollHandler(eventHandler);
  }

  _unbindScroll () {
    this.scroll.removeScrollHandler();
  }

  _getSectionPositions () {

    var sections = [
      'meet',
      'typeform-experience',
      // 'skills',
      'experience',
      'contacts'
    ];
    var results = [];

    sections.forEach(x => {
      var sectionElement = angular.element('#' + x)[0];

      console.log('Section:', x, sectionElement.offsetTop, sectionElement.offsetHeight)

      if (sectionElement) {
        results.push({
          element: x,
          start: sectionElement.offsetTop,
          end: sectionElement.offsetTop + sectionElement.offsetHeight
        });
      }
    });

    return results;
  }

  _scrollToElement (section, callback) {
    var self = this;

    return self.scroll.scrollTo(section.element, 15, 1000);
  }

  _getScrollToSection (scrollPosition, sections) {
    var self = this;

    if (scrollPosition < sections[0].start) {
      return sections[1];
    } else if (scrollPosition > sections[sections.length - 1].end) {
      return sections[sections.length - 1];
    } else {
      var result = null;

      sections.some((x, index) => {
        if (scrollPosition >= x.start && scrollPosition <= x.end) {
          var section = sections[index + 1];

          if (section) {
            result = section;

            return true;
          } else {
            console.error('scrollManager: Scroll section was not found or user reached last section');
            return false;
          }
        }
      });

      return result;
    }

    return null;
  }

  _isLastSection (scrollPosition, sections) {
    return scrollPosition >= sections[sections.length - 1].start;
  }

  _scrollTop () {
    var self = this;

    return self.scroll.scrollTop();
  }

  _setNextSection (currentNextSection, sections) {
    var self = this;

    var currentNextSectionId = null;

    sections.some((x, index) => {
      if (x.element === currentNextSection.element)
      {
        currentNextSectionId = index;
        return true;
      }

      return false;
    });

    self.nextSection = sections[currentNextSectionId + 1];
  }
}

ScrollManager.$inject = ['ScrollService', '$timeout', 'ScrollDirection'];

export default ScrollManager;
