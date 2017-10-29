'use strict';

class LayoutCtrl {
  constructor ($scope, $timeout, ScrollService, ScrollTiming) {
  	this.$scope = $scope;
    this.scroll = ScrollService;

    this.scroll.preventScroll();
    $timeout(() => this.scroll.scrollTop(ScrollTiming.top));
  }
}

LayoutCtrl.$inject = ['$scope', '$timeout', 'ScrollService', 'ScrollTiming'];

export default LayoutCtrl;
