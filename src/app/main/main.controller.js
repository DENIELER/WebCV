'use strict';

class MainCtrl {
  constructor ($scope, $document, $window, $timeout, ScrollService) {
  	this.$window = $window;
	this.$document = $document;  	
	this.$timeout = $timeout;
  	this.scroll = ScrollService;
  	this.$scope = $scope;

   	this.$scope.skills = false; 

   	this.$document.bind('scroll', this.scrollHandler.bind(this));
  }

  scrollHandler () {
  	var self = this;

	  	if(self.$scope.skills) {

	  		if(self.prevTop < self.$document.scrollTop()) {
	  			self.scroll.scrollTo('skills', 0, 500);
	  		} else {
	  			self.scroll.scrollTop(500);
	  		}
	  	}

  	self.prevTop = self.$document.scrollTop();
  }
}

MainCtrl.$inject = ['$scope', '$document', '$window', '$timeout', 'ScrollService'];

export default MainCtrl;
