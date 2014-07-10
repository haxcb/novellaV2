var cNov = angular.module('nov.controllers', []);

cNov.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', 'Data', function($scope, $ionicModal, $timeout, Data) {
  	
	// Provide data access to HTML
	$scope.getEnrolledCourses = function() {
		return Data.getEnrolledCourses();
	}
	
	$scope.setCurrentCourse = function(id) {
		Data.setCurrentCourse(id);
	}
	
	// Provide data access to HTML
	$scope.getCurrentCourse = function() {
		return Data.getCurrentCourse();
	}

}]);

cNov.controller('MainCtrl', ['$scope', function($scope, Data) {


}]);
cNov.controller('CoursesCtrl', ['$scope', function($scope) {



}]);


cNov.controller('LoginCtrl', ['$scope', function($scope) {

}]);
