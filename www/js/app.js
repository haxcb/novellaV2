// Novella Course Management System

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'nov' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'nov.controllers' is found in controllers.js
var nov = angular.module('nov', ['ionic', 'textAngular', 'nov.controllers', 'nov.services', 'nov.directives']);

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

// Add new HTML pages here
nov.config(function($stateProvider, $urlRouterProvider) {
  

    $stateProvider.state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "nov-templates/menu.html",
      controller: 'AppCtrl'
    });

    $stateProvider.state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "login.html",
          controller: 'LoginCtrl'
        }
      }
    });
	
    $stateProvider.state('app.courses', {
      url: "/courses",
      views: {
        'menuContent' :{
          templateUrl: "courses.html",
          controller: 'CoursesCtrl'
        }
      }
    });

    $stateProvider.state('app.course', {
      url: "/courses/:courseId",
      views: {
        'menuContent' :{
          templateUrl: "course.html",
          controller: 'CourseCtrl'
        }
      }
    });

    $stateProvider.state('app.courseMaterial', {
      url: "/courses/:courseId/materials/:materialId",
      views: {
        'menuContent' :{
          templateUrl: "courseMaterial.html",
          controller: 'CourseMaterialCtrl'
        }
      }
    });
	
    $stateProvider.state('app.participation', {
      url: "/courses/:courseId/participation",
      views: {
        'menuContent' :{
          templateUrl: "participation.html",
          controller: 'ParticipationCtrl'
        }
      }
    });

    $stateProvider.state('app.attendance', {
      url: "/courses/:courseId/attendance",
      views: {
        'menuContent' :{
          templateUrl: "attendance.html",
          controller: 'AttendanceCtrl'
        }
      }
    }); 
	
    $stateProvider.state('app.assignments', {
      url: "/courses/:courseId/assignments",
      views: {
        'menuContent' :{
          templateUrl: "assignments.html",
          controller: 'AssignmentsCtrl'
        }
      }
    });	
	
    $stateProvider.state('app.assignmentCreate', {
      url: "/courses/:courseId/assignments/create",
      views: {
        'menuContent' :{
          templateUrl: "assignmentCreate.html",
          controller: 'AssignmentCreateCtrl'
        }
      }
    });	

    $stateProvider.state('app.assignment', {
      url: "/courses/:courseId/assignments/:assignmentId",
      views: {
        'menuContent' :{
          templateUrl: "assignment.html",
          controller: 'AssignmentCtrl'
        }
      }
    });

    $stateProvider.state('app.submission', {
      url: "/courses/:courseId/assignments/:assignmentId/submissions/:submissionId",
      views: {
        'menuContent' :{
          templateUrl: "submission.html",
          controller: 'SubmissionCtrl'
        }
      }
    });  
	
    $stateProvider.state('app.quizzes', {
      url: "/courses/:courseId/quizzes",
      views: {
        'menuContent' :{
          templateUrl: "quizzes.html",
          controller: 'QuizzesCtrl'
        }
      }
    });	
	
	$stateProvider.state('app.createquiz', {
      url: "/courses/:courseId/quizzes/create",
      views: {
        'menuContent' :{
          templateUrl: "createquiz.html",
          controller: 'CreateQuizCtrl'
        }
      }
    });	
	
	$stateProvider.state('app.viewquiz', {
      url: "/courses/:courseId/quizzes/:quizId/view",
      views: {
        'menuContent' :{
          templateUrl: "viewquiz.html",
          controller: 'ViewQuizCtrl'
        }
      }
    });	
	
	$stateProvider.state('app.quiz', {
      url: "/courses/:courseId/quizzes/:quizId",
      views: {
        'menuContent' :{
          templateUrl: "quiz.html",
          controller: 'QuizCtrl'
        }
      }
    });
	
    $stateProvider.state('app.grades', {
      url: "/courses/:courseId/grades",
      views: {
        'menuContent' :{
          templateUrl: "grades.html",
          controller: 'GradesCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

