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

app.controller('PwdModifyCtrl', ['$scope', '$state', '$stateParams', 'PluginUtil', '$ionicLoading', '$ionicHistory', '$interval', 'User', 'UserTO', 'Task', 'Database', function ($scope, $state, $stateParams, PluginUtil, $ionicLoading, $ionicHistory, $interval, User, UserTO, Task, Database) {
    $scope.user = {};
    var user = new UserTO();

    $scope.init = function () {
        user.setUser(User.getUser());
        $scope.user.fromReset = false;
    }

    $scope.doSubmit = function () {
        if (!$scope.checkInput()) {
            return;
        }

        $ionicLoading.show({
            noBackdrop: true,
            template: '正在提交修改，请稍候...'
        });

        user.setPassword($scope.user.newPassword)
        user.setFlag(UserTO.RESET_PASSWORD);
        console.debug('重置密码的user:\n' + JSON.stringify(user));
        Task.getUserInfo(user).then(
            function (result) {
                var ret = angular.fromJson(result.data);
                console.debug('重置密码网络回调:\n' + JSON.stringify(ret));
                var code = ret['code'];
                var desc = ret['desc'];
                var msg = angular.fromJson(ret['msg']);

                if (code == UserTO.RESULT_OK) {
                    user.setUser(msg);
                    User.setUser(msg);
                    console.debug('重置密码后的User:\n' + JSON.stringify(user));
                    $ionicLoading.hide();
                    PluginUtil.showAlert('密码已重置,请牢记您的新密码', '前往登录', function () {
                        $state.go('login');
                    });
                    //var params = {
                    //    from: 'PasReset',
                    //    data: user
                    //}
                    //$state.go('pasreset', params);
                } else {
                    $ionicLoading.hide();
                    if (desc == null || desc == '') {
                        PluginUtil.showAlert('重置失败，请重试一次...', null);
                    } else {
                        PluginUtil.showAlert(desc, null);
                    }
                }

            }, function (error) {
                $ionicLoading.hide();
                PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
            });
    }

    $scope.checkInput = function () {
        var reg2 = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,20}$/;


        if (!$scope.user.oldPassword || !reg2.test($scope.user.oldPassword)) {
            PluginUtil.toastShortTop("请正确填写旧密码")
            return false;
        }


        if (!$scope.user.newPassword || !reg2.test($scope.user.newPassword)) {
            PluginUtil.toastShortTop("请正确填写新密码")
            return false;
        }

        if (!$scope.user.pwdConfirm || $scope.user.pwdConfirm != $scope.user.newPassword) {
            PluginUtil.toastShortTop("请确认两次输入的密码保持一致")
            return false;
        }
        return true;
    }

    $scope.init();
}]);