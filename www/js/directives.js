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

nov.directive('novLongButton', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novLongButton.html'
	};
});

nov.directive('novButtonContentsLeft', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novButtonContentsLeft.html'
	};
});
nov.directive('novButtonContentsRight', function() {
	return {
	
		restrict: 'E', 
		replace: true,
		transclude: true,
		templateUrl: 'nov-templates/novButtonContentsRight.html'
	};
});

//http://tech.pro/tutorial/1357/phonegap-and-angularjs-in-app-browser
nov.directive("openExternal", function($window){
    return {
        restrict: 'E',
        scope: {
            url : "="
        },
        transclude: true,
        template:"<button class='btn' ng-click='openUrl()'><span ng-transclude></span></button>",
        controller: function($scope){

            var wrappedFunction = function(action){
                return function(){
                    $scope.$apply(function(){
                        action();
                    });
                };
            };
            var inAppBrowser;
            $scope.openUrl = function(){
                inAppBrowser = $window.open($scope.url, '_blank', 'location=yes');
                if($scope.exit instanceof Function){
                    inAppBrowser.addEventListener('exit', wrappedFunction($scope.exit));
                }
            };
        }
    };
});

//http://plnkr.co/edit/0N728e9SAtXg3uBvuXKF?p=preview
nov.directive('youtube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});