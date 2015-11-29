'use strict';

class LoadedDirective {
	constructor ($timeout, ScrollManagerService) {

		this.template = '<span></span>';
    this.restrict = 'E';
    this.replace = true;
    this.scope = {}

    this.$timeout = $timeout;

    this.scrollManager = ScrollManagerService;
  }

  link(scope, element) {
  	var self = LoadedDirective.instance;
    self.$scope = scope;
    self.element = element;

    self.$timeout(x => self.scrollManager.init());
  }

	static directiveFactory($timeout, ScrollManagerService){
		LoadedDirective.instance = new LoadedDirective($timeout, ScrollManagerService);
		return LoadedDirective.instance;
	}
}

LoadedDirective.directiveFactory.$inject = ['$timeout', 'ScrollManagerService'];

export default LoadedDirective;
