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
    .controller('AccountCtrl',[ '$scope', '$state', '$ionicPopup','$ionicLoading', 'User','Task','Database', function ($scope,$state, $ionicPopup, $ionicLoading, User, Task, Database) {

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
            User.setFlag('REG');

            Task.getUserInfo(User.getUser())
                .then(function (data) {
                    var res = angular.fromJson(data.data);
                    var code = res['code'];
                    var desc = res['desc'];
                    var msg = angular.fromJson(res['msg']);
                    if(code == User.RESULT_OK()){
                        User.setUser(msg);
                        localStorage['user'] = JSON.stringify(User.getUser());
                        //var ret = Database.insert(msg['uName'], msg['token']);
                        //console.log(ret);
                        $ionicLoading.hide();
                        $scope.showAlert('恭喜您，注册成功！请牢记您的账号和密码！','前往登录',function(){
                            $state.go("login", {}, {reload: true});
                        });
                    } else {
                        $ionicLoading.hide();
                        if(desc == null || desc == ''){
                            $scope.showAlert('很抱歉,注册失败....');
                            User.clear();
                        } else {
                            $scope.showAlert('注册失败,' + desc);
                            User.clear();
                        }
                    }
                }, function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('系统或网络异常，请稍后重试！');
                    User.clear();
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
        $scope.showAlert = function(template,ok,success) {
            var alertPopup = $ionicPopup.alert({
                template: template,
                okText: ok, // String (default: 'OK'). The text of the OK button.
                okType: 'button-calm' // String (default: 'button-positive'). The type of the OK button.
            });
            alertPopup.then(success);
        };
    }])

    .controller('LoginCtrl',[ '$scope', '$state', '$ionicPopup','$ionicLoading', '$interval', 'User','Task', 'Database', function ($scope,$state, $ionicPopup, $ionicLoading, $interval, User, Task, Database) {
        $scope.user = {};
        $scope.userList = [];
        $scope.user.isSavedUser = true;
        $scope.$on('$ionicView.afterEnter', function () {
            Database.getUserList().then(function(result){
                $scope.userList = result;
                console.debug($scope.userList);
                if(User.getUserName() && User.getUserName() != ''){
                    $scope.user.username = User.getUserName();
                } else if ($scope.userList.length > 0){
                    $scope.selectUser( $scope.userList[0]);
                }
            });
        })
        $scope.user.btnText = '获取验证码';
        // 获取验证码按钮是否可用
        $scope.user.isEnabled = false;
        $scope.user.listStyle = "ion-chevron-down";

        $scope.showUserList = function(isShow){
            $scope.user.list = isShow;
            if($scope.user.list){
                $scope.user.listStyle = "ion-chevron-up";
            } else {
                $scope.user.listStyle = "ion-chevron-down";
            }
        }

        $scope.selectUser = function(user){
            $scope.user.username = user.uName;
            $scope.user.password = user.password;
            if(user.password == ''){
                $scope.user.isSavedUser = false;
            } else{
                $scope.user.isSavedUser = true;
            }
            $scope.showUserList(false);
        }

        $scope.deleteUser = function(user){
            if(user.uName == $scope.user.username){
                $scope.user.username = "";
                $scope.user.password = "";
            }
            $scope.userList = Database.delete(user).then(function(result){
                $scope.userList = result;
                if(result.length <= 0){
                    $scope.showUserList(false);
                }
                console.debug(result);
            });

        }

        $scope.getAuthCode = function () {

            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($scope.user.mobile))){
                $scope.toast("请填写正确的手机号码")
                return false;
            }

            var initSec = 120;
            var stop;
            $scope.fight = function() {
                // Don't start a new fight if we are already fighting
                if ( angular.isDefined(stop) ) return;

                stop = $interval(function() {
                    if (initSec > 0) {
                        initSec = initSec - 1;
                        $scope.user.btnText = '获取验证码(' + initSec + ')';
                    } else {
                        $scope.user.btnText = '获取验证码';
                        $scope.user.isEnabled = false;
                        $scope.stopFight();
                    }
                }, 1000);
            };

            $scope.stopFight = function() {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            $scope.user.btnText = '获取验证码(' + initSec + ')';
            $scope.user.isEnabled = true;
            $scope.fight();
        }

        $scope.doTelReg = function () {
            var tel = ZYDevice.tel;
            alert(tel);
        }

        $scope.doLogin = function() {
            if(!$scope.checkInput()){
                return;
            }

            $ionicLoading.show({
                noBackdrop:true,
                template: '正在登录中...'
            });

            //ZYCallbackPlugin.desEncrypt($scope.user.password, function(res){
            //    alert(res);
            //})
            User.setUsername($scope.user.username);
            User.setPassword($scope.user.password);
            User.setFlag('LOGIN');
            console.log('登录前的User:\n' + JSON.stringify(User.getUser()));
            Task.getUserInfo(User.getUser())
                .then(function (data) {
                    var res = angular.fromJson(data.data);
                    console.log('网络回调:\n' + JSON.stringify(res));
                    var code = res['code'];
                    var desc = res['desc'];
                    var msg = angular.fromJson(res['msg']);

                    if(code == User.RESULT_OK() || code == User.RESULT_99()){
                        User.setUser(msg);
                        console.log('登录后的User:\n' + JSON.stringify(User.getUser()));
                        var login_date = new Date().getTime();
                        console.error($scope.user.isSavedUser);
                        if($scope.user.isSavedUser == true) {
                            Database.insert(User.getUser(), login_date).then(function(result){
                                $scope.userList = result;
                                console.log('存储结果1：' + JSON.stringify(result));
                            });

                        } else {
                            User.setPassword('');
                            Database.insert(User.getUser(), login_date).then(function(result){
                                $scope.userList = result;
                                console.log('存储结果1：' + JSON.stringify(result));
                            });
                        }
                        $ionicLoading.hide();
                        $scope.toast(msg['uName'] + ', 欢迎回来！');
                    } else {
                        $ionicLoading.hide();
                        if(desc == null || desc == ''){
                            $scope.showAlert('很抱歉,登录失败....' , null);
                        } else {
                            $scope.showAlert('登录失败,' + desc, null);
                        }
                    }
                }, function (data) {
                    $ionicLoading.hide();
                    $scope.showAlert('系统或网络异常，请稍后重试！', null);
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
            return true;
        }

        $scope.toast = function (msg) {
            alert(msg);
            //window.plugins.toast.showShortTop(msg);
        }

        // An alert dialog
        $scope.showAlert = function(template,ok,success) {
            var alertPopup = $ionicPopup.alert({
                template: template,
                okText: ok, // String (default: 'OK'). The text of the OK button.
                okType: 'button-calm' // String (default: 'button-positive'). The type of the OK button.
            });
            alertPopup.then(success);
        };

        $scope.toLogin = function(){
            $scope.display_title = "指游方寸";
            $scope.display_login = "display:block";
            $scope.display_tel_reg = "display:none";
        }

        $scope.toReg = function() {
            $state.go("reg");
        }

        $scope.toTelReg = function(){
            $scope.display_title = "用户注册";
            $scope.display_login = "display:none";
            $scope.display_tel_reg = "display:block";
        }


        $scope.toLogin();

    }])


