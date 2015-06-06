'use strict';

import MainCtrl from './main/main.controller';

import TextTypeCtrl from '../app/components/texttype/texttype.controller';
import TextTypeDirective from '../app/components/texttype/texttype.directive';

var config = require('./config');

//external
var typeTypeLib = require('../vendors/jquery.typetype.min');
var scrollLib = require('../vendors/angular-scroll.min');

angular.module('denieler', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'duScroll'])

  .controller('MainCtrl', MainCtrl)
  .directive('textType', TextTypeDirective.directiveFactory)

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;

config();