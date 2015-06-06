'use strict';

import TypeTypeLib from '../../../vendors/jquery.typetype.min';

class TextTypeDirective {
	constructor ($timeout, MEET_TEXT) {

		this.templateUrl = 'app/components/texttype/texttype.html'; 
        this.restrict = 'E'; 
        this.replace = true;
        this.scope = {} 

        this.$timeout = $timeout;
        this.MEET_TEXT = MEET_TEXT;
    } 

    link(scope, element) { 
		TextTypeDirective.instance
		.$timeout(() => TextTypeDirective.instance.startTyping(element), 1000)
		.then(() => TextTypeDirective.instance.showPhotos(element));
    } 

    startTyping (element) {
    	var MEET_TEXT = TextTypeDirective.instance.MEET_TEXT;

    	return new Promise(
			function (resolve, reejct) {

		        element
		        .find('#meetTextarea')
		        .focus()
		        .typetype(MEET_TEXT.text, {
			    	t: MEET_TEXT.time,
			    	e: MEET_TEXT.errors,
			    	
			    	callback: function () {
			    		resolve();
			    	}
			    });
			}
		);
	}

    showPhotos (element) {
    	element.find('#photo1, #photo2, #photo3, #photo4, #photo5')
    	.css('opacity', '1');
    }

	static directiveFactory($timeout, MEET_TEXT){
		TextTypeDirective.instance = new TextTypeDirective($timeout, MEET_TEXT);
		return TextTypeDirective.instance;
	}
}

TextTypeDirective.directiveFactory.$inject = ['$timeout', 'MEET_TEXT'];

export default TextTypeDirective;