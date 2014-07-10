/*
	DIRECTIVE:
		For manipulating DOM
		4 DOM Styles
			Attribute (A) 	<a custom-element> </a>
			Element (E)		<custom-element> </custom-element>		<---- Buggy in old browsers
			Class(C)		<a class="custom-element"> </a> 		<---- Compatible with old IE
			Comment (M)		<!-- directive: custom-button -->
		Naming Convention
			JS: customElement
			DOM: custom-element
			
*/

var nov = angular.module('nov.directives', []);

nov.directive('novContent', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novContent.html'
	};
});

nov.directive('novButton', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novButton.html'
	};
});

nov.directive('novFrame', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novFrame.html'
	};
});

nov.directive('novCourseButton', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novCourseButton.html'
	};
});

nov.directive('novCourseIcons', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: false,
		templateUrl: 'nov-templates/novCourseIcons.html'
	};
});