/*
	CONTROLLERS:
		For manipulating DATA only
		NEVER use DOM manipulation here (do that with directives)
*/

var nov = angular.module('nov.controllers', []);

// Commonly used app-wide methods
nov.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', '$http', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, $http) {
	
	// Enable/disable dragging to open the menu
	$scope.setMenuDrag = function(val) {
		$ionicSideMenuDelegate.canDragContent(val);
	};
	

}]);

// Provide data access to HTML (corresponds with services.js)
nov.controller('DataCtrl', ['$scope', 'Data', function($scope, Data) {
	
	$scope.getStudent = function() {
		return Data.getStudent();
	};

}]);

nov.controller('LoginCtrl', ['$scope', 'Data', 'userModel', function($scope, Data, userModel) {
	$scope.userModel = userModel;
	$scope.setUser = userModel.setUser;
}]);

nov.controller('CoursesCtrl', ['$scope', 'Data', 'userModel', function($scope, Data, userModel) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();
	$scope.notifications = [];

	var courses = Data.getStudent().enrolledCourses;
	for (var i = courses.length - 1; i >= 0; i--) {
		var singularCourse = Data.getCourseNotifications(courses[i].id);
		for(var j = singularCourse.length -1; j >= 0; j--) {
			singularCourse[j].course = courses[i];
			$scope.notifications.push(singularCourse[j]);
		}
	};
}]);

nov.controller('CourseCtrl', ['$scope', '$stateParams', 'Data', 'userModel', function($scope, $stateParams, Data, userModel) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();
	$scope.course = Data.getCourse($stateParams.courseId);
	$scope.materials = Data.getCourseMaterials($stateParams.courseId);
	$scope.predicate = '-uploadDate';
	$scope.editing = false;
	$scope.fileTypeOptions = [
		{id: 1, name: 'PDF'}, 
		{id: 2, name: 'video'}, 
		{id: 3, name: 'Create with text editor'}
		];
	$scope.notifications = Data.getCourseNotifications($stateParams.courseId);
}]);

nov.controller('CourseMaterialCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();
	var materials = Data.getCourseMaterials($stateParams.courseId);
	var courseMaterial = $filter('filter')(materials, {id: $stateParams.materialId})[0];
	$scope.courseMaterial = courseMaterial;

	var parseYoutube = function(url) { 
		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match&&match[2].length==11){
		    return match[2];
		}
	};
	$scope.code = parseYoutube(courseMaterial.url);
}]);

nov.controller('ParticipationCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('AssignmentsCtrl', ['$scope', '$stateParams', 'Data', 'userModel', function($scope, $stateParams, Data, userModel) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	
	$scope.course = Data.getCourse($stateParams.courseId);
	$scope.assignments = Data.getAssignments($stateParams.courseId);

	$scope.getSubmissionStatusColor = function(id) {
		if(Data.getAssignmentSubmissions(id).length > 0) {
			var status = Data.getAssignmentSubmissions(id)[0].status;
			if(status == 'submitted' || status == 'late')
				return 'green';
			else if(status == 'unsubmitted')
				return 'gray';
		}
		return 'orange';
	};
	$scope.getSubmissionStatus = function(id) {
		if(Data.getAssignmentSubmissions(id).length > 0) {
			var status = Data.getAssignmentSubmissions(id)[0].status;
			return status;
		}
		return '';
	};
	
	$scope.predicate = '-dueDate';
	$scope.date = new Date();
	
}])

//Adapted from Zack Argyle
//http://stackoverflow.com/questions/20335409/ng-repeat-compare-to-current-date-using-filter
.filter('upcomingAssignments', function() {
	return function (assignments) {
		var filtered_list = [];
		for (var i = 0; i < assignments.length; i++) {
			var today = new Date().getTime();
			var dueDate = new Date(assignments[i].dueDate).getTime();
			if (today <= dueDate) {
			  	filtered_list.push(assignments[i]);
			}
		}
		return filtered_list;
	};
})

.filter('pastAssignments', function() {
	return function (assignments) {
		var filtered_list = [];
		for (var i = 0; i < assignments.length; i++) {
			var today = new Date().getTime();
			var dueDate = new Date(assignments[i].dueDate).getTime();
			if (today > dueDate) {
			  	filtered_list.push(assignments[i]);
			}
		}
		return filtered_list;
	};
});

nov.controller('AssignmentCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	

	$scope.course = Data.getCourse($stateParams.courseId);
	var assignments = Data.getAssignments($stateParams.courseId);
	var assignment = $filter('filter')(assignments, {id: $stateParams.assignmentId})[0];
	$scope.assignment = assignment;
	$scope.submissions = Data.getAssignmentSubmissions($stateParams.assignmentId);

	$scope.master = {};

	$scope.uploadFile = function(){
		console.log(document.getElementById('file').files[0]);
	};

	$scope.save = function(submission) {
		$scope.master = angular.copy(submission);
	};

	$scope.pattern = /^\d*(\.\d*)?$/;

}]);
nov.controller('AssignmentCreateCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('SubmissionCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	

	$scope.course = Data.getCourse($stateParams.courseId);
	var assignments = Data.getAssignments($stateParams.courseId);
	var assignment = $filter('filter')(assignments, {id: $stateParams.assignmentId})[0];
	$scope.assignment = assignment;
	$scope.submissions = Data.getAssignmentSubmissions($stateParams.assignmentId);

	$scope.master = {};

	$scope.uploadFile = function(){
		console.log(document.getElementById('file').files[0]);
	};

	$scope.save = function(submission) {
		$scope.master = angular.copy(submission);
	};

	$scope.pattern = /^\d*(\.\d*)?$/;

}]);

nov.controller('GradesCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('QuizzesCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();
	$scope.course = Data.getCourse($stateParams.courseId);	
	$scope.quizzes = Data.getQuizzes($stateParams.courseId);
}]);

nov.controller('CreateQuizCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	
	$scope.course = Data.getCourse($stateParams.courseId);	
}]);

nov.controller('QuizCtrl', ['$scope', '$stateParams', 'Data', 'userModel', '$filter', function($scope, $stateParams, Data, userModel, $filter) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();	
	$scope.course = Data.getCourse($stateParams.courseId);
	
	var quizzes = Data.getQuizzes($stateParams.courseId);
	var quiz = $filter('filter')(quizzes, {id: $stateParams.quizId})[0];
	$scope.quiz = quiz;
	
	$scope.started = false;
	$scope.currentQuestion = 0;
	$scope.questionSet = [];
	
	$scope.index = 0;
}]);