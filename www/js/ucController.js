/**
 * Created by sandy on 2015/2/5.
 */
// *******************
// 用户中心
// *******************
app.controller('UserCenterCtrl', ['$scope','User','Task',function ($scope, User, Task) {

    $scope.init = function () {
        $scope.user = User.getUser();
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
}]);