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
    .directive('myDer', function () {
        return {
            restrict: 'A',
            replace:true,
            link: function (scope, element, attr) {
                scope.$watch('che',
                    function (newValue) {
                        element[0].type = newValue ? 'text' : 'password';
                    })
            }
        };
    })



    .directive('bcaSignUpPassword', function () {
        var templateViewPassword = '<div>' +
            '<input name="username" type="email" ng-model="user.Email"  placeholder="Email" required/>' +
            '<input  name="password" type="password" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
            '<input name="viewPassword"  type="checkbox" ng-model="viewPasswordCheckbox">' +
            '</div>';


        return {

            template: templateViewPassword,
            replace:true,
            restrict: 'E',

            link: function(scope, element, attrs) {

                scope.$watch('viewPasswordCheckbox',
                    function (newValue) {
                        element.find('input')[1].type = newValue ? 'text' : 'password';
                        console.debug(element.find('input'));
                    })

            }
        };
    });