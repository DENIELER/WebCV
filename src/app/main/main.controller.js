'use strict';

class MainCtrl {
  constructor ($scope, $document, $window, $timeout) {
  	this.$window = $window;
	this.$document = $document;  	
	this.$timeout = $timeout;
  	this.$scope = $scope;

   	this.$scope.skills = false; 

   	//this.$document.bind('scroll', this.scrollHandler.bind(this));
  }

//  scrollHandler () {
//  	var self = this;
//
//	  	if(self.$scope.skills) {
//
//	  		if(self.prevTop < self.$document.scrollTop()) {
//	  			self.scroll.scrollTo('skills', 0, 500);
//	  		} else {
//	  			self.scroll.scrollTop(500);
//	  		}
//	  	}
//
//  	self.prevTop = self.$document.scrollTop();
//  }
}

MainCtrl.$inject = ['$scope', '$document', '$window', '$timeout'];

export default MainCtrl;
