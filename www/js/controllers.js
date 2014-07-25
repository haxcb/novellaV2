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
	}

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

		

		/*$http.post('http://127.0.0.1:8000/lms/login/', {email:"amalik",password:"22amal86"})
		.success(function(data, status, headers, config) {
			$scope.messages.push(data)
		}).error(function(data, status){
			$scope.errors.push(status);

		});*/

		

		
	}

	
	

}]);

nov.controller('LoginCtrl', ['$scope', function($scope) {

}]);

nov.controller('CoursesCtrl', ['$scope', function($scope) {

}]);

nov.controller('CourseCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('ParticipationCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('AssignmentsCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('GradesCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);

nov.controller('QuizzesCtrl', ['$scope', '$stateParams', 'Data', function($scope, $stateParams, Data) {
	$scope.course = Data.getCourse($stateParams.courseId);
}]);
