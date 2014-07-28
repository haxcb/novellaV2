
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

nov.service('date', function () {
	this.getDate = function() {
		var day = new Date();
		temp = day.toDateString();
		temp = temp.substring(4, 10);
		return temp.toUpperCase();
	}
	this.getTime = function() {
		var time = new Date();
		minute = time.getMinutes();
		if (minute < 10){
			minute = '0' + minute;
		}
		if (time.getHours() <= 12){
			return time.getHours() + ':' + minute + 'AM';
		} else {
			return (time.getHours() - 12) + ':' + minute + 'PM';
		}
	}
});


nov.service('Data', function ($http) {

	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Student
	//////////////////////////////////////////////////////////////////////////////////////////////////////////
	var jsonData;
	var data = this;

	// WIP; Restructured data
	$http.get('data/data.json').then(function(res){

		var bb = res.data; 
		// console.log(bb);
	});
	
	// Actual data
	$http.get('data/data.json').then(function(res){

		jsonData = res.data;   
		var currentUser = jsonData.users[0];

		data.getStudent = function() {
			return currentUser;
		};
		
		data.setUser = function(role) {
			if(role == 'student') {
				currentUser = jsonData.users[0];
			} else if(role == 'instructor') {
				currentUser = jsonData.users[1];
			}
		}
		

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Courses
		//////////////////////////////////////////////////////////////////////////////////////////////////////////

		
		var currentCourse = jsonData.courses[0]; // Default value to avoid strange cases
		
		data.getCourse = function(id) {
			var courses = jsonData.courses;
			for(var i in courses) {
				if(courses[i].id == id) {
					return courses[i];
				}
			}
			return null;
		};		
		
		data.getStudentCourse = function(id) {
			var courses = data.getStudent().courses;
			for(var i in courses) {
				if(courses[i].id == id) {
					return courses[i];
				}
			}
			return null;
		};

		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Course Materials & Assignments
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		data.getCourseMaterials = function(id) {
			if(data.getCourse(id) != null)
				return data.getCourse(id).courseMaterials;
			return null;
		};

		data.getCourseMaterial = function(courseId, materialId) {
			var mats = data.getCourseMaterials(courseId);
			for(var i in mats) {
				if(mats[i].id == materialId) {
					return mats[i];
				}
			}
			return null;
		};
		
		data.addCourseMaterial = function(courseId, material) {
			if (material != null) {
				if (material.fileType.name == 'video') {
					material.fileType = 'video';
				}
				if (material.fileType.name == 'PDF') {
					material.fileType = 'PDF';
				}
				var mats = data.getCourseMaterials(courseId);
				if (mats != null) {
					var firstCourseMaterialId = mats[0].id
					material.id = firstCourseMaterialId + mats.length;
					mats.push(material);
				}
			}


		};

		data.getCourseNotifications = function(courseId) {
			var courseMaterials = data.getCourseMaterials(courseId);
			var assignments = data.getAssignments(courseId);
			if(assignments == null)
				assignments = [];
			if(courseMaterials == null)
				courseMaterials = [];
			return courseMaterials.concat(assignments);
		};

		data.getAssignments = function(courseId) {
			if(data.getCourse(courseId) != null)
				return data.getCourse(courseId).assignments;
			return null;
		};

		data.getAssignment = function(courseId, assignmentId) {
			var assigns = data.getAssignments(courseId);
			for(var i in assigns) {
				if(assigns[i].id == assignmentId) {
					return assigns[i];
				}
			}
			return null;
		};

		// ADDED COURSE ID PARAMETER HERE!!!
		data.getAssignmentSubmissions = function(courseId, assignmentId) {
			var course = data.getStudentCourse(courseId);
			var submissions = course.submissions;
			var filtered_list = [];
			for (var i in submissions) {
				if (submissions[i].assignmentId == assignmentId) {
					filtered_list.push(submissions[i]);
				}
			}
			return filtered_list;
		};
		
		data.getAttendance = function(courseId) {
			if(data.getCourse(courseId) != null)
				return data.getCourse(courseId).studentList;
			return null;
		};
		
		data.getQuizzes = function(courseId) {
			if(data.getCourse(courseId) != null)
				return data.getCourse(courseId).quizzes;
			return null;
		};

		// GET RID OF THIS
		data.getStudentSubmissions = function() {
			return jsonData.submissions;
		};

	});
});