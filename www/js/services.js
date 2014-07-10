
/*
	SERVICES
		Used for particular design patterns (singletons)
		Used inside of controllers (with dependency injection)
			Must specify in the controller declaration that it's being used
			BEFORE: testApp.controller('MainCtrl', ['$scope', function ($scope) {
			AFTER: testApp.controller('MainCtrl', ['$scope', 'Math', function ($scope, Math) {
			
*/
var sNov = angular.module('nov.services', []);

sNov.service('Data', function () {

	var currentCourse = {};

	var enrolledCourses = [
	{ name: 'CMPT 475', id: 0, instructor: 'Herbert H. Tsang', semester: 'Summer 2014', section: 'E100' },
	{ name: 'CMPT 355', id: 1, instructor: 'Wo Shun Luk', semester: 'Summer 2014', section: 'D100' },
	{ name: 'ENGL 103w', id: 2, instructor: 'Orion Kidder', semester: 'Summer 2014', section: 'D100' }
	];
	
	this.setCurrentCourse = function(id) {
		
		currentCourse = enrolledCourses[id];
		console.log("Current course set to: " + currentCourse);
	}
	
	this.getCurrentCourse = function() {
		
		return currentCourse;
	}
	
	this.getEnrolledCourses = function() {
		return enrolledCourses;
	}

});