'use strict';

class LayoutCtrl {
  constructor ($scope, $document, $window, $timeout) {
  	this.$document = $document;  	
	this.$scope = $scope;
    
    $timeout(function () {
      $('.letter').onepage_scroll({
        pagination: false
      });
    });
  }
}

LayoutCtrl.$inject = ['$scope', '$document', '$window', '$timeout'];

export default LayoutCtrl;
