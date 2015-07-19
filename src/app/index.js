'use strict';

import MainCtrl from './main/main.controller';
import LayoutCtrl from './layout/layout.controller';

import ScrollService from '../app/services/scroll';

import MeetDirective from '../app/components/meet/meet.directive';
import SkillsDirective from '../app/components/skills/skills.directive';

var config = require('./config');

//external
var typeTypeLib = require('../vendors/jquery.typetype.min');
var scrollLib = require('../vendors/angular-scroll.min');
var onePageScroll = require('../vendors/jquery.onepage-scroll');

angular.module('denieler', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 
  'ui.router', 'duScroll'])

  .controller('MainCtrl', MainCtrl)
  .controller('LayoutCtrl', LayoutCtrl)
  
  //.service('ScrollService', ScrollService.serviceFactory)

  //.directive('meet', MeetDirective.directiveFactory)
  //.directive('skills', SkillsDirective.directiveFactory)

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        templateUrl: 'app/layout/layout.html',
        controller: 'LayoutCtrl'
      })
      .state('home.main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;

config();