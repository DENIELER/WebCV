'use strict';

class ScrollService {

	constructor ($document, $timeout) {
		this.$document = $document;
        this.$timeout = $timeout;

		this.duration = 700;
        this.scrollBlocked = false;
    } 

	static serviceFactory($document, $timeout){
		ScrollService.instance = new ScrollService($document, $timeout);
		return ScrollService.instance;
	}

	scrollTo (elementId, offset, duration) {
		var self = ScrollService.instance;

        if (!self.scrollBlocked) {
        	var offset = offset || 0;
            var duration = duration || self.duration;

            self.scrollBlocked = true;
            
            self.$timeout(() => { self.scrollBlocked = false; }, 1000);
        	var scrollElement = angular.element(document.getElementById(elementId));
        	return self.$document.scrollToElementAnimated(scrollElement, offset, duration, function (t) { return t*t*t })
                .then(() => {
                    self.$timeout(() => { self.scrollBlocked = false; }, 300)
                });
        }
    }

    scrollTop (duration) {
    	var self = ScrollService.instance;
        
        if (!self.scrollBlocked) {
            var duration = duration || self.duration;

            self.scrollBlocked = true;

            self.$timeout(() => { self.scrollBlocked = false; }, 1000);
            return self.$document.scrollToAnimated(0, 0, duration, function (t) { return t*t*t })
                .then(() => {
                    self.$timeout(() => { self.scrollBlocked = false; }, 300)
                });
        }
    }
}

ScrollService.serviceFactory.$inject = ['$document', '$timeout'];

export default ScrollService;