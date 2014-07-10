// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var nov = angular.module('nov', ['ionic', 'nov.controllers', 'nov.services']);

nov.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

nov.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "nov-templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "login.html",
          controller: 'LoginCtrl'
        }
      }
    })
	
    .state('app.courses', {
      url: "/courses",
      views: {
        'menuContent' :{
          templateUrl: "courses.html",
          controller: 'CoursesCtrl'
        }
      }
    })

    .state('app.course', {
      url: "/courses/course",
      views: {
        'menuContent' :{
          templateUrl: "course.html",
          controller: 'CoursesCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

