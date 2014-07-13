
/*
	SERVICES
		Used for particular design patterns (singletons)
		Used inside of controllers (with dependency injection)
			Must specify in the controller declaration that it's being used
			BEFORE: testApp.controller('MainCtrl', ['$scope', function ($scope) {
			AFTER: testApp.controller('MainCtrl', ['$scope', 'Math', function ($scope, Math) {
			
*/
var nov = angular.module('nov.services', []);

nov.service('Data', function () {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Student
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var student = {
		name: 'David Holik',
		id: '301142643',
		enrolledCourses: [
		{ name: 'CMPT 475', id: 0, instructor: 'Herbert H. Tsang', semester: 'Summer 2014', section: 'E100', role: 'Student',
			courseMaterials: [
				{ name: 'Intro to Software Engineering', id: 10, fileType: 'pdf'},
				{ name: 'Agile Development', id: 11, fileType: 'pdf'}
			] },
		{ name: 'CMPT 355', id: 1, instructor: 'Wo Shun Luk', semester: 'Summer 2014', section: 'D100', role: 'Student' },
		{ name: 'ENGL 103w', id: 2, instructor: 'Orion Kidder', semester: 'Summer 2014', section: 'D100', role: 'Student' }
		]
	};
	
	this.getStudent = function() {
		return student;
	}
	

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Courses
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	var currentCourse = student.enrolledCourses[0]; // Default value to avoid strange cases
	
	this.getCourse = function(id) {
		console.log('Course: ' + id);
		return student.enrolledCourses[id];
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Course Materials & Assignments
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.getCourseMaterials = function(id) {
		console.log('Course: ' + id);
		return student.enrolledCourses[id].courseMaterials;
	}

});