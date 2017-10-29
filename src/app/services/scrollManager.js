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
    var self = this;

    document.body.style.overflow = 'auto';

    self.scroll.allowScroll(-2, scrollUpTo);

    self._bindScroll(-2, scrollUpTo, callback);
  }

  scrollModuleHandler (topScrollLimit, bottomScrollLimit, callback, e) {
    const scrollTop = window.scrollY;

    const self = this;
    const scrollDirection = self.scroll.getScrollDirection();
    if (scrollTop > topScrollLimit && scrollTop < bottomScrollLimit) {
      console.log('ScrollManager: Blocked scroll handler.')
      return;
    }

    if (scrollDirection === self.scrollDirection.up) {
      console.log('ScrollManager: During scroll top blocked scroll handler.');
      return;
    }

    const isLastSection = self._isLastSection(scrollTop, self.sections)
    if (isLastSection) {
      console.log('ScrollManager: Last section detected. Blocked scroll handler.')
      return;
    }

    document.body.style.overflow = '';
  	this.scroll.preventScroll();
    self._unbindScroll();

    console.info('ScrollManager: Scroll event trigger fired.');

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
        console.info('ScrollManager: Scroll to next section: ', self.nextSection);

        self._scrollToElement(scrollToSection)
        .then(() => callback());

        self._setNextSection(scrollToSection, self.sections);
      } else {
        self._scrollToElement(scrollToSection)
      }
    }
    // }
  }

  _bindScroll (topScrollLimit, bottomScrollLimit, callback) {
    console.log('ScrollManager: Bind scroll event')
    this.onScrollEventHandler = this.scrollModuleHandler.bind(this, topScrollLimit, bottomScrollLimit, callback);
    this.scroll.addScrollHandler(this.onScrollEventHandler);
  }

  _unbindScroll () {
    console.log('ScrollManager: Unbind scroll event')
    this.scroll.removeScrollHandler(this.onScrollEventHandler);
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

      console.log('ScrollManager: Section - ', x, sectionElement.offsetTop, sectionElement.offsetHeight)

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
            console.error('ScrollManager: Scroll section was not found or user reached last section');
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
