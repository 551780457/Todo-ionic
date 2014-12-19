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
    .controller('AccountCtrl',[ '$scope', '$state', '$ionicPopup','$ionicLoading', 'User','Task', function ($scope,$state, $ionicPopup, $ionicLoading, User, Task) {
        $scope.user = {};
        $scope.doRegister = function () {
            if(!$scope.checkInput()){
                return;
            }

            $ionicLoading.show({
                noBackdrop:true,
                template: '正在注册中...'
            });

            User.setUsername($scope.user.username);
            User.setPassword($scope.user.password);
            User.setFlag(0);
            Task.getUserInfo(User.getUser())
                .then(function (res) {
                    $ionicLoading.hide();
                    console.log('res', res);
                    console.log('ok', User.getUser());
                    var res = angular.fromJson(res);
                    if(res['code'] == User.RESULT_OK()){
                        $scope.showAlert('Tips','恭喜您，注册成功！');
                    }
                }, function (err, status) {
                    $ionicLoading.hide();
                    console.log('error', err);

                });

        }

        $scope.checkInput = function () {
            var reg = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,20}$/;
            if(!$scope.user.username){
                $scope.toast("用户名不能为空，请检查后重新填写")
                return false;
            }

            if (!reg.test($scope.user.username)){
                $scope.toast("用户名应为6-30个字符，只能包含数字、字母和“_”、“@”、“.”");
                return false;
            }

            if(!$scope.user.password){
                $scope.toast("密码不能为空，请检查后重新填写")
                return false;
            }

            var reg2 = /[^\u4e00-\u9fa5]{6,20}$/;
            if(!reg2.test($scope.user.password)) {
                $scope.toast("密码应为6-20个字符,区分大小写,不能为中文")
                return false;
            }

            if(!$scope.user.pwdConfirm || $scope.user.password != $scope.user.pwdConfirm){
                $scope.toast("请确认两次输入的密码保持一致")
                return false;
            }
            return true;
        }


        $scope.toast = function (msg) {
            alert(msg);
            //window.plugins.toast.showShortTop(msg);
        }

        // An alert dialog
        $scope.showAlert = function(title,template) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone' + res);
            });
        };



    }])
