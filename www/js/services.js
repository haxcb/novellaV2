
/*
	SERVICES
		Used for particular design patterns (singletons)
		Used inside of controllers (with dependency injection)
			Must specify in the controller declaration that it's being used
			BEFORE: testApp.controller('MainCtrl', ['$scope', function ($scope) {
			AFTER: testApp.controller('MainCtrl', ['$scope', 'Math', function ($scope, Math) {
			
*/
var nov = angular.module('nov.services', []);

nov.factory('userModel', function () {
    var userModel = {
        currentUser: ""
    };
    userModel.setUser = function (userRole) {
        userModel.currentUser = userRole;
    };
    userModel.getUser = function () {
    	return userModel.currentUser;
    };
    return userModel;
});

nov.service('numberToAlphabetic', function () {
	this.convert = function(integer) {
		switch (integer)
		{
			case 0:
				return 'a';
			case 1:
				return 'b';
			case 2:
				return 'c';
			case 3:
				return 'd';
			case 4:
				return 'e';
			case 5:
				return 'f';
			default:
				return '-';
		}
	}
});


nov.service('Data', function ($http) {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Student
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	var info;
	var data = this;

	// WIP; Restructured data
	$http.get('data/data.json').then(function(res){

		var bb = res.data; 
		// console.log(bb);
	});
	
	// Actual data
	$http.get('data/posts.json').then(function(res){

		info = res.data;   

		data.getStudent = function() {
			return info;
		};
		

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Courses
		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		
		var currentCourse = info.enrolledCourses[0]; // Default value to avoid strange cases
		
		data.getCourse = function(id) {
			return info.enrolledCourses[id];
		};

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Course Materials & Assignments
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		data.getCourseMaterials = function(id) {
			return info.enrolledCourses[id].courseMaterials;
		};

		data.getCourseMaterial = function(courseId, materialId) {
			return info.enrolledCourses[courseId].courseMaterials[materialId];
		};

		data.getCourseNotifications = function(courseId) {
			var courseMaterials = info.enrolledCourses[courseId].courseMaterials;
			var assignments = info.enrolledCourses[courseId].assignments;
			return courseMaterials.concat(assignments);
		};

		data.getAssignments = function(courseId) {
			return info.enrolledCourses[courseId].assignments;
		};

		data.getAssignment = function(courseId, assignmentId) {
			return info.enrolledCourses[courseId].assignments[assignmentId];
		};

		data.getAssignmentSubmissions = function(assignmentId) {
			var submissions = info.submissions;
			var filtered_list = [];
			for (var i = 0; i < submissions.length; i++) {
				if (submissions[i].assignmentId == assignmentId) {
					filtered_list.push(submissions[i]);
				}
			}
			return filtered_list;
		};
		
		data.getQuizzes = function(courseId) {
			return info.enrolledCourses[courseId].quizzes;
		};

		data.getStudentSubmissions = function() {
			return info.submissions;
		};

	});
});