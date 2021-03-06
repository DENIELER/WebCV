'use strict';

import MainCtrl from './main/main.controller';
import LayoutCtrl from './layout/layout.controller';

import ScrollService from '../app/services/scroll';
import ScrollManager from '../app/services/scrollManager';
import StyleUtilsService from '../app/services/styleUtils';
import TypingService from '../app/services/typing';

import MeetDirective from '../app/components/meet/meet.directive';
import TypeformExperienceDirective from '../app/components/typeform-experience/typeform-experience.directive';
import SkillsDirective from '../app/components/skills/skills.directive';
import ExperienceDirective from '../app/components/experience/experience.directive';
import ContactsDirective from '../app/components/contacts/contacts.directive';

import LoadedDirective from '../app/components/loaded/loaded.directive';

var config = require('./config');

//external
var typeTypeLib = require('../vendors/jquery.typetype.min');
var scrollLib = require('../vendors/angular-scroll.min');
var polyfillLib = require('../vendors/polyfill.min');

angular.module('denieler', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'duScroll'])

  .controller('MainCtrl', MainCtrl)
  .controller('LayoutCtrl', LayoutCtrl)

  .service('ScrollService', ScrollService)
  .service('ScrollManagerService', ScrollManager)
  .service('StyleUtilsService', StyleUtilsService)
  .service('TypingService', TypingService)

  .directive('meet', MeetDirective.directiveFactory)
  .directive('typeformExperience', TypeformExperienceDirective.directiveFactory)
  .directive('skills', SkillsDirective.directiveFactory)
  .directive('experience', ExperienceDirective.directiveFactory)
  .directive('contacts', ContactsDirective.directiveFactory)

  .directive('loaded', LoadedDirective.directiveFactory)

  .constant('ScrollTiming', { top: 1500})
  .constant('ScrollDirection', { up: 0, down: 1})

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

  .value('duScrollCancelOnEvents', false);
;

config();
