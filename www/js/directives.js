angular.module('todo.io.directives', [])

    .directive('ngBlur', ['$parse', function ($parse) {
        return function (scope, element, attr) {
            var fn = $parse(attr['ngBlur']);
            element.bind('blur', function (event) {
                scope.$apply(function () {
                    fn(scope, {$event: event});
                });
            });
        }
    }])



//focus directive
.directive('myFocus', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watch(attr['myFocus'], function (n, o) {
                if (n != 0 && n) {
                    element[0].focus();
                }
            });
        }
    };
})
//blur directive
.directive('myBlur', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('blur', function () {
                //apply scope (attributes)
                scope.$apply(attr['myBlur']);
                //return scope value for focusing to false
                scope.$eval(attr['myFocus'] + '=false');
            });
        }
    };
})