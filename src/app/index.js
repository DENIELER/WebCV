'use strict';

import MainCtrl from './main/main.controller';

import ScrollService from '../app/services/scroll';

import MeetDirective from '../app/components/meet/meet.directive';
import SkillsDirective from '../app/components/skills/skills.directive';

var config = require('./config');

//external
var typeTypeLib = require('../vendors/jquery.typetype.min');
var scrollLib = require('../vendors/angular-scroll.min');

angular.module('denieler', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 
  'ui.router', 'duScroll'])

  .controller('MainCtrl', MainCtrl)
  
  .service('ScrollService', ScrollService.serviceFactory)

  .directive('meet', MeetDirective.directiveFactory)
  .directive('skills', SkillsDirective.directiveFactory)

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