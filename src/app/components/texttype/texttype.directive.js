'use strict';

import TypeTypeLib from '../../../vendors/jquery.typetype.min';

class TextTypeDirective {
	constructor ($timeout) {

		this.templateUrl = 'app/components/texttype/texttype.html'; 
        this.restrict = 'E'; 
        this.replace = true;
        this.scope = {} 

        this.$timeout = $timeout;
    } 

    link(scope, element) { 
		TextTypeDirective.instance
		.$timeout(() => TextTypeDirective.instance.startTyping(element), 1000)
		.then(() => TextTypeDirective.instance.showPhotos(element));
    } 

    startTyping (element) {
    	return new Promise(
			function (resolve, reejct) {

		        element
		        .find('#meetTextarea')
		        .focus()
		        .typetype('Hi! :)')
			    .typetype('\n\nMy name Daniel Ostapenko. And I am - web developer.' + 
			    	'\n\nIt\'s me:\n', {
			    	t: 70,
			    	e: 0.04,
			    	// t: 10,
			    	// e: 0,

			    	callback: function () {
			    		resolve();
			    	}
			    });
			}
		);
	}

    showPhotos (element) {
    	element.find('#photo1')
    	.css('opacity', '1');

    	element.find('#photo2')
    	.css('opacity', '1');

    	element.find('#photo3')
    	.css('opacity', '1');

    	element.find('#photo4')
    	.css('opacity', '1');

    	element.find('#photo5')
    	.css('opacity', '1');
    }

	static directiveFactory($timeout){
		TextTypeDirective.instance = new TextTypeDirective($timeout);
		return TextTypeDirective.instance;
	}
}

TextTypeDirective.directiveFactory.$inject = ['$timeout'];

export default TextTypeDirective;