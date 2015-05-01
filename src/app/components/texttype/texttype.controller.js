'use strict';

class TextTypeCtrl {
  constructor ($scope) {
    $scope.date = new Date();
  }

  typeGreetings () {

    $('textarea').focus()
    .typetype("Sometimes, it's really nice to simulate a human typing...", {
      callback: function() {
        $('body').addClass('reveal')
      }
    }).delay(500)
    .typetype("\n\nThat's what this `typetype` jQuery plugin is for.")
    .fadeTo(400,0.3)
    .delay(500)
    .queue(function(){$('#secondhalf').fadeIn(1000);$('textarea').dequeue()}).delay(4000).fadeTo(400,1.0).delay(1000)
    .typetype("\n\nYou can make it fast... ")
    .typetype("or slow and error-prone.", {
      t:200,
      e:0.2, // the default error rate is 0.04
    })
    .backspace(48)
    .typetype("Try it out!");
  }

}

TextTypeCtrl.$inject = ['$scope'];

export default TextTypeCtrl;
