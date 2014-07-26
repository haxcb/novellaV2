/*
	CONTROLLERS:
		For manipulating DATA only
		NEVER use DOM manipulation here (do that with directives)
*/

var nov = angular.module('nov.controllers', []);



// Commonly used app-wide methods
nov.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
	
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

nov.controller('servLoginCtrl', ['$scope', '$http', function($scope, $http) {

	/*

	$scope.test = function(){
		$window.alert("Hi");
	};

	*/

	$scope.formData = {};

	$scope.errors = [];
	$scope.messages = [];

	$scope.logIn = function() {
		$scope.errors.splice(0, $scope.errors.length); //to reset errors array
		$scope.messages.splice(0, $scope.messages.length); //to reset messages array
		

		
		$http({
			url 	: 'http://127.0.0.1:8000/lms/login/',
			method 	: 'POST',
			data 	: {'email':$scope.email,'password':$scope.password},
			dataType: 'json',
			
			headers : {'Content-Type' : 'application/json'},
			
		}).success(function(data, status, headers, config) {
			$scope.messages.push(status, data)
		}).error(function(status){
			$scope.errors.push(status, data);
		});

		

		

		
	}

	
	

}]);

nov.controller('LoginCtrl', ['$scope', 'Data', 'userModel', function($scope, Data, userModel) {
	$scope.userModel = userModel;
	$scope.setUser = userModel.setUser;
}]);

nov.controller('CoursesCtrl', ['$scope', 'Data', 'userModel', function($scope, Data, userModel) {
	$scope.userModel = userModel;
	$scope.user = $scope.userModel.getUser();
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
	$scope.predicate = '-dueDate';
	$scope.date = new Date();
	$scope.editing = false;
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
	
	$scope.currentQuestion = 0;
	$scope.questionSet = [];
	
	$scope.index = 0;
}]);
