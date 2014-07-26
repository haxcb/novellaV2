
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
				{ name: 'Intro to Software Engineering', id: 10, fileType: 'PDF', uploadDate: '2014-05-05', download: true, url: 'test/1.PDF'},
				{ name: 'Agile Development', id: 11, fileType: 'PDF', uploadDate: '2014-05-12', download: true, url: 'test/1.PDF'},
				{ name: 'Security', id: 12, fileType: 'PDF', uploadDate: '2014-06-16', url: 'test/1.PDF'},
				{ name: 'Video tutorial', id:13, fileType: 'video', uploadDate: '2014-07-20', url: 'https://www.youtube.com/watch?v=pYkRc4s1OEg'}
			],
			assignments: [
				{name: 'Project Deliverable 1', id: 21, dueDate: '2014-05-25', totalGrade: 100, weight: 25, uploadDate: '2014-05-05', url: 'test/1.PDF'},
				{name: 'Report', id: 22, dueDate: '2014-06-15', weight: 30, totalGrade: 80, uploadDate: '2014-06-05', url: 'test/1.PDF'},
				{name: 'Project Deliverable 2', id: 23, dueDate: '2014-08-20', totalGrade: 10, weight: 30, uploadDate: '2014-07-05', url: 'test/1.PDF'}
			],
			quizzes: [
				{name: 'Quiz 1', id: 40, dueDate: '2014-05-25', questions: [ 
					{value : 'Which value is not part of the Agile Manifesto?', answer: 0, responses : 
						['Simple requirements over comprehensive documentation', 
						'People over processes',
						'Customer collaboration over contract negotiation',
						'Responding to change over following a plan']
					}, 
					{value: 'Which values are part of the Agile Manifesto?', answer: 1, responses :
						['Incorrect answer here',
						'Correct answer here']
					}
				]},
				{name: 'Quiz 2', id: 41, dueDate: '2014-04-25'}
			] },
		{ name: 'CMPT 355', id: 1, instructor: 'Wo Shun Luk', semester: 'Summer 2014', section: 'D100', role: 'Student', 
			courseMaterials: [
				{ name: 'Lecture 1', id: 14, fileType: 'PDF', uploadDate: '2014-05-05', download: true, url: 'test/1.PDF'},
				{ name: 'Lecture 2', id: 15, fileType: 'PDF', uploadDate: '2014-05-12', url: 'test/1.PDF'}
			],
			assignments: [
				{name: 'Assignment 1', id: 24, dueDate: '2014-05-25', totalGrade: 100, weight: 25, uploadDate: '2014-05-05', url: 'test/1.PDF'},
				{name: 'Assignment 2', id: 25, dueDate: '2014-08-20', totalGrade: 10, weight: 30, uploadDate: '2014-05-05', url: 'test/1.PDF'}
			] },
		{ name: 'ENGL 103w', id: 2, instructor: 'Orion Kidder', semester: 'Summer 2014', section: 'D100', role: 'Student',
			courseMaterials: [
				{ name: 'Introduction to Hamlet', id: 16, fileType: 'PDF', uploadDate: '2014-05-05', download: true, url: 'test/1.PDF'},
				{ name: 'Different Types of Irony', id: 17, fileType: 'PDF', uploadDate: '2014-05-12', url: 'test/1.PDF'}
			],
			assignments: [
				{name: 'Character Analysis', id: 26, dueDate: '2014-05-25', totalGrade: 100, weight: 25, uploadDate: '2014-05-05', url: 'test/1.PDF'},
				{name: 'Term Paper', id: 28, dueDate: '2014-08-20', totalGrade: 10, weight: 30, uploadDate: '2014-05-05', url: 'test/1.PDF'}
			] },
		],
		submissions: [
			{id: 40, assignmentId: 21, submitDate: '2014-05-25', status: 'submitted', actualGrade: 100, studentComment: 'Please give me a good mark, Herbert.', instructorComment: 'Well done', file: 'test/1.PDF'},
			{id: 41, assignmentId: 22, submitDate: '2014-06-16', status: 'late', actualGrade: '', studentComment: 'Sorry, late!', instructorComment: '', file: 'test/1.PDF'},
			{id: 42, assignmentId: 33, submitDate: '2014-06-16', status: 'submitted', actualGrade: '', studentComment: 'This was hard', instructorComment: '', file: 'test/1.PDF'},
			{id: 43, assignmentId: 24, submitDate: '2014-06-16', status: 'unsubmitted', actualGrade: '', studentComment: '', instructorComment: '', file: 'test/1.PDF'},
			{id: 44, assignmentId: 26, submitDate: '2014-06-16', status: 'submitted', actualGrade: 25, studentComment: 'I like hotdogs.', instructorComment: 'Please elaborate', file: 'test/1.PDF'},
		]
	};
	
	this.getStudent = function() {
		return student;
	};
	

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Courses
	//////////////////////////////////////////////////////////////////////////////////////////////////////////

	
	var currentCourse = student.enrolledCourses[0]; // Default value to avoid strange cases
	
	this.getCourse = function(id) {
		return student.enrolledCourses[id];
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Course Materials & Assignments
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	this.getCourseMaterials = function(id) {
		return student.enrolledCourses[id].courseMaterials;
	};

	this.getCourseMaterial = function(courseId, materialId) {
		return student.enrolledCourses[courseId].courseMaterials[materialId];
	};

	this.getCourseNotifications = function(courseId) {
		var courseMaterials = student.enrolledCourses[courseId].courseMaterials;
		var assignments = student.enrolledCourses[courseId].assignments;
		return courseMaterials.concat(assignments);
	};

	this.getAssignments = function(courseId) {
		return student.enrolledCourses[courseId].assignments;
	};

	this.getAssignment = function(courseId, assignmentId) {
		return student.enrolledCourses[courseId].assignments[assignmentId];
	};

	this.getAssignmentSubmissions = function(assignmentId) {
		var submissions = student.submissions;
		var filtered_list = [];
		for (var i = 0; i < submissions.length; i++) {
			if (submissions[i].assignmentId == assignmentId) {
			  	filtered_list.push(submissions[i]);
			}
		}
		return filtered_list;
	};
	
	this.getQuizzes = function(courseId) {
		return student.enrolledCourses[courseId].quizzes;
	};

});