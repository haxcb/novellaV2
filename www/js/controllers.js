var cNov = angular.module('nov.controllers', []);

// Commonly used app-wide methods
cNov.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
	
	// Enable/disable dragging to open the menu
	$scope.setMenuDrag = function(val) {
		$ionicSideMenuDelegate.canDragContent(val);
	};

}]);


// Provide data access to HTML (corresponds with services.js)
cNov.controller('DataCtrl', ['$scope', 'Data', function($scope, Data) {
	
	$scope.getEnrolledCourses = function() {
		return Data.getEnrolledCourses();
	}
	
	$scope.setCurrentCourse = function(id) {
		Data.setCurrentCourse(id);
	}
	
	$scope.getCurrentCourse = function() {
		return Data.getCurrentCourse();
	}

}]);


cNov.controller('CoursesCtrl', ['$scope', function($scope) {

}]);


cNov.controller('LoginCtrl', ['$scope', function($scope) {

}]);
