angular.module('todo.io.controllers', [])

// *******************
// 用户中心
// *******************
    .controller('UserCenterCtrl', function ($scope, User, Task) {

        $scope.init = function () {
            var username = 'a81566119';
            User.setUsername(username);
            $scope.user = User.getUser();
            $scope.getUserInfo();
        }

        $scope.getUserInfo = function () {

            //Task.getUserInfo($scope.user)
            //    .then(function (res) {
            //        alert(res);
            //    }, function (err, status) {
            //        alert('网络访问失败');
            //    });
        }


        $scope.switchAccount = function () {
            
        }

        $scope.returnToGame = function () {
            ZYCallbackPlugin.call(
                'Test',
                function () {
                    alert('Plugin success');
                },
                function () {
                    alert('plugin fail');
                }
            );
        }


        $scope.init();
    })

// *******************
// 账户注册登录模块
// *******************
    .controller('AccoountCtrl', function ($scope, $state, MenuService) {


    })
