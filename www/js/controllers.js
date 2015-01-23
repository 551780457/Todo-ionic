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
    .controller('AccountCtrl', ['$scope', '$state', 'PluginUtil', '$ionicLoading', 'User', 'Task', 'Database', 'UserTO', function ($scope, $state, PluginUtil, $ionicLoading, User, Task, Database, UserTO) {

        $scope.user = {};

        $scope.doRegister = function () {
            if (!$scope.checkInput()) {
                return;
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在注册中...'
            });

            var user = new UserTO();
            user.setUsername($scope.user.username);
            user.setPassword($scope.user.password);
            user.setFlag(UserTO.REG);
            console.debug('注册前的ser:\n' + JSON.stringify(user));
            Task.getUserInfo(user).then(
                function (data) {
                    var ret = angular.fromJson(data.data);
                    var code = ret['code'];
                    var desc = ret['desc'];
                    var msg = angular.fromJson(ret['msg']);

                    if (code == UserTO.RESULT_OK) {
                        User.setUser(msg);
                        console.debug('注册后的Usuer:\n' + JSON.stringify(User.getUser()));
                        $ionicLoading.hide();
                        PluginUtil.showAlert('注册成功！请牢记您的账号和密码！', '前往登录', function () {
                            $state.go("login", {}, {reload: true});
                        });
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('很抱歉,注册失败....');
                        } else {
                            PluginUtil.showAlert('注册失败,' + desc);
                        }
                    }
                }, function (data) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！');
                });

        }

        $scope.checkInput = function () {
            var reg = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,30}$/;
            if (!$scope.user.username) {
                PluginUtil.toastShortTop("用户名不能为空，请检查后重新填写")
                return false;
            }

            if (!reg.test($scope.user.username)) {
                PluginUtil.toastShortTop("用户名应为6-30个字符，只能包含数字、字母和“_”、“@”、“.”");
                return false;
            }

            if (!$scope.user.password) {
                PluginUtil.toastShortTop("密码不能为空，请检查后重新填写")
                return false;
            }

            var reg2 = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,20}$/;
            if (!reg2.test($scope.user.password)) {
                PluginUtil.toastShortTop("密码应为6-20个字符,区分大小写,不能为中文")
                return false;
            }

            if (!$scope.user.pwdConfirm || $scope.user.password != $scope.user.pwdConfirm) {
                PluginUtil.toastShortTop("请确认两次输入的密码保持一致")
                return false;
            }
            return true;
        }
    }])

    .controller('LoginCtrl', ['$scope', '$state', '$ionicLoading', '$interval', 'User', 'UserTO', 'Task', 'Database', 'PluginUtil', function ($scope, $state, $ionicLoading, $interval, User, UserTO, Task, Database, PluginUtil) {
        $scope.user = {};
        $scope.userList = [];
        $scope.user.isSavedUser = true;
        $scope.user.listStyle = "ion-chevron-down";
        $scope.$on('$ionicView.afterEnter', function () {
            console.debug('进入的User:\n' + JSON.stringify(User.getUser()))
            Database.getUserList().then(function (result) {
                console.debug('数据库的User:\n' + JSON.stringify(result))
                $scope.userList = result;
                if (User.getUserName() && User.getUserName() != '') {
                    $scope.user.username = User.getUserName();
                    $scope.user.password = '';
                } else if ($scope.userList.length > 0) {
                    $scope.selectUser($scope.userList[0]);
                }
            });
        })

        $scope.showUserList = function (isShow) {
            $scope.user.list = isShow;
            if ($scope.user.list) {
                $scope.user.listStyle = "ion-chevron-up";
            } else {
                $scope.user.listStyle = "ion-chevron-down";
            }
        }

        $scope.selectUser = function (user) {
            $scope.user.username = user.uName;
            $scope.user.password = user.password;
            if (user.password == '') {
                $scope.user.isSavedUser = false;
            } else {
                $scope.user.isSavedUser = true;
            }
            $scope.showUserList(false);
        }

        $scope.deleteUser = function (user) {
            if (user.uName == $scope.user.username) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $scope.userList = Database.delete(user).then(function (result) {
                $scope.userList = result;
                if (result.length <= 0) {
                    $scope.showUserList(false);
                }
                console.debug(result);
            });

        }

        $scope.getAuthCode = function () {

            if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($scope.user.mobile))) {
                PluginUtil.toastShortTop("请填写正确的手机号码")
                return false;
            }

            var initSec = 120;
            var stop;
            $scope.fight = function () {
                // Don't start a new fight if we are already fighting
                if (angular.isDefined(stop)) return;

                stop = $interval(function () {
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

            $scope.stopFight = function () {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            $scope.user.btnText = '获取验证码(' + initSec + ')';
            $scope.user.isEnabled = true;
            $scope.fight();
        }

        $scope.doLogin = function () {
            if (!$scope.checkInput()) {
                return;
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在登录中...'
            });

            //ZYCallbackPlugin.desEncrypt($scope.user.password, function(res){
            //    alert(res);
            //})
            var user = new UserTO();
            user.setUsername($scope.user.username);
            user.setPassword($scope.user.password);
            user.setFlag(UserTO.LOGIN);

            Task.getUserInfo(user).then(
                function (result) {
                    var res = angular.fromJson(result.data);
                    console.debug('登录网络回调:\n' + JSON.stringify(res));
                    var code = res['code'];
                    var desc = res['desc'];
                    var msg = angular.fromJson(res['msg']);

                    if (code == UserTO.RESULT_OK || code == UserTO.RESULT_99) {
                        User.setUser(msg);
                        var login_date = new Date().getTime();

                        if ($scope.user.isSavedUser == true) {
                            User.setPassword($scope.user.password);
                            Database.insert(User.getUser(), login_date).then(function (result) {
                                $scope.userList = result;
                                console.debug('存储结果1：' + JSON.stringify(result));
                            });
                        } else {
                            User.setPassword('');
                            Database.insert(User.getUser(), login_date).then(function (result) {
                                $scope.userList = result;
                                console.debug('存储结果1：' + JSON.stringify(result));
                            });
                        }
                        $ionicLoading.hide();
                        PluginUtil.toastShortTop(msg['uName'] + ', 欢迎回来！');
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('很抱歉,登录失败....', null);
                        } else {
                            PluginUtil.showAlert('登录失败,' + desc, null);
                        }
                    }
                }, function (data) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
                });
        }

        $scope.checkInput = function () {
            var reg = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,30}$/;
            if (!$scope.user.username) {
                PluginUtil.toastShortTop("用户名不能为空，请检查后重新填写")
                return false;
            }

            if (!reg.test($scope.user.username)) {
                PluginUtil.toastShortTop("用户名应为6-30个字符,区分大小写,不能为中文");
                return false;
            }

            if (!$scope.user.password) {
                PluginUtil.toastShortTop("密码不能为空，请检查后重新填写")
                return false;
            }

            var reg2 = /[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-@]{6,20}$/;
            //var reg2 = /[^\u4e00-\u9fa5]{6,20}$/;
            if (!reg2.test($scope.user.password)) {
                PluginUtil.toastShortTop("密码应为6-20个字符,区分大小写,不能为中文")
                return false;
            }
            return true;
        }

        $scope.toReg = function () {
            $state.go("reg");
        }

        $scope.toTelReg = function () {
            var params = {
                from: 'TelReg',
                data: null
            };
            $state.go('verifytel', params);
        }
    }])


    .controller('TelBindTipsCtrl', ['$scope', '$state', 'PluginUtil', '$ionicLoading', '$ionicHistory', 'UserTO', 'Task', 'Database', function ($scope, $state, PluginUtil, $ionicLoading, $ionicHistory, UserTO, Task, Database) {
        $scope.toBind = function () {
            var params = {
                from: 'TelBind',
                data: null
            };
            $state.go('verifytel', params);
        }

        $scope.bindLater = function () {
            // todo 关闭窗口，登录回调
        }
    }])


    .controller('VerifyUserCtrl', ['$scope', '$state', 'PluginUtil', '$ionicLoading', '$ionicHistory', 'UserTO', 'Task', 'Database', function ($scope, $state, PluginUtil, $ionicLoading, $ionicHistory, UserTO, Task, Database) {
        $scope.user = {};

        $scope.setInputEmpty = function () {
            $scope.user.username = "";
        }

        $scope.toPrevious = function () {
            $ionicHistory.goBack();
        }

        $scope.toNext = function () {
            if (!$scope.user.username) {
                PluginUtil.toastShortTop("请输入正确的登录账号或手机")
                return;
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在提交，请稍候...'
            });

            var user = new UserTO();
            user.setUsername($scope.user.username);
            user.setFlag(UserTO.VERIFY_USER);
            Task.getUserInfo(user).then(
                function (result) {
                    var ret = angular.fromJson(result.data);
                    console.debug('验证账号网络回调:\n' + JSON.stringify(ret));
                    var code = ret['code'];
                    var desc = ret['desc'];
                    var msg = angular.fromJson(ret['msg']);

                    if (code == UserTO.RESULT_OK || code == UserTO.RESULT_99) {
                        user.setUser(msg);
                        console.debug('验证账号后的User:\n' + JSON.stringify(user));
                        if (user.mobile) {
                            var params = {
                                from: 'PasReset',
                                data: user
                            };
                            $state.go('verifytel', params);
                        } else {
                            $scope.user.isAccountError = true;
                        }
                        $ionicLoading.hide();
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('验证失败，请重新输入账号进行验证', null);
                        } else {
                            PluginUtil.showAlert('验证失败，' + desc, null);
                        }
                    }
                }, function (data) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
                });
        }

    }])

    .controller('VerifyTelCtrl', ['$scope', '$state', '$stateParams', 'PluginUtil', '$ionicLoading', '$ionicHistory', '$interval', 'User','UserTO', 'Task', 'Database', function ($scope, $state, $stateParams, PluginUtil, $ionicLoading, $ionicHistory, $interval, User, UserTO, Task, Database) {
        $scope.user = {};
        var from = $stateParams.from;
        var data = $stateParams.data;
        var user = new UserTO();

        $scope.init = function () {
            $scope.user.btnText = '获取验证码';
            $scope.user.authDisable = false; // 获取验证码按钮是否可用
            if (from == 'PasReset') {
                user.setUser(data);
                var reg = /(\d{3})\d{4}(\d{4})/;
                var tel = user.mobile.replace(reg, "$1****$2");
                $scope.user.mobile = tel;
                $scope.user.fromPas = true;
                $scope.user.title = '密码找回';
                user.setFlag(UserTO.SEND_CODE_RESET_PAS);
            } else if (from == 'TelReg') {
                $scope.user.fromPas = false;
                $scope.user.fromReg = true;
                $scope.user.title = '用户注册';
                user.setFlag(UserTO.SEND_CODE_RESET_PAS);
            } else if(from == 'TelBind') {
                $scope.user.fromPas = false;
                $scope.user.title = '绑定手机';
                user.setFlag(UserTO.SEND_CODE_BIND_TEL);
            }
        }

        $scope.toPrevious = function () {
            $ionicHistory.goBack();
        }

        $scope.doTelReg = function () {
            var tel = ZYDevice.tel;
            alert(tel);
        }

        $scope.setAuthDisable = function () {
            var initSec = 120;
            var stop;
            $scope.fight = function () {
                // Don't start a new fight if we are already fighting
                if (angular.isDefined(stop)) return;

                stop = $interval(function () {
                    if (initSec > 0) {
                        initSec = initSec - 1;
                        $scope.user.btnText = '获取验证码(' + initSec + ')';
                    } else {
                        $scope.user.btnText = '获取验证码';
                        $scope.user.authDisable = false;
                        $scope.stopFight();
                    }
                }, 1000);
            };

            $scope.stopFight = function () {
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            $scope.user.btnText = '获取验证码(' + initSec + ')';
            $scope.user.authDisable = true;
            $scope.fight();
        }

        $scope.getAuthCode = function () {
            if (from == 'TelReg' || from == 'TelBind') {
                if (!(/^1[0-9][0-9]\d{4,8}$/.test($scope.user.mobile))) {
                    PluginUtil.toastShortTop("请填写正确的手机号码")
                    return false;
                }
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在请求发送验证码，请稍候...'
            });

            console.debug('请求发送验证码的user:\n' + JSON.stringify(user));
            $scope.setAuthDisable();
            Task.getUserInfo(user).
                then(function (result) {
                    var ret = angular.fromJson(result.data);
                    console.debug('发送验证码网络回调:\n' + JSON.stringify(ret));
                    var code = ret['code'];
                    var desc = ret['desc'];
                    var msg = angular.fromJson(ret['msg']);

                    if (code == UserTO.RESULT_OK) {
                        $ionicLoading.hide();
                        PluginUtil.showAlert('验证码已发送，请您注意查收。', null);
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('很抱歉，发送失败，请重试一次...', null);
                        } else {
                            PluginUtil.showAlert(desc, null);
                        }
                    }
                }, function (error) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
                });
        }

        $scope.toNext = function () {
            if (!$scope.user.authCode) {
                PluginUtil.toastShortTop("请填写正确的验证码")
                return false;
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在验证手机，请稍候...'
            });

            user.setAuthCode($scope.user.authCode);
            user.setFlag(UserTO.SUBMIT_AUTHCODE);
            console.debug('提交验证码的user:\n' + JSON.stringify(user));
            Task.getUserInfo(user).then(
                function (result) {
                    var ret = angular.fromJson(result.data);
                    console.debug('提交验证码网络回调:\n' + JSON.stringify(ret));
                    var code = ret['code'];
                    var desc = ret['desc'];
                    var msg = angular.fromJson(ret['msg']);

                    if (code == UserTO.RESULT_OK) {
                        user.setUser(msg);
                        console.debug('提交验证码后的User:\n' + JSON.stringify(user));
                        var params = {
                            from: 'PasReset',
                            data: user
                        }
                        $state.go('pasreset', params);
                        $ionicLoading.hide();
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('验证失败，请重新输入账号进行验证', null);
                        } else {
                            PluginUtil.showAlert(desc, null);
                        }
                    }

                }, function (error) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
                });
        }

        $scope.doSubmitBind = function (){
            if (!$scope.user.authCode) {
                PluginUtil.toastShortTop("请填写正确的验证码")
                return false;
            }

            $ionicLoading.show({
                noBackdrop: true,
                template: '正在提交绑定，请稍候...'
            });

            user.setUser(User);
            user.setMobile($scope.user.mobile);
            user.setAuthCode($scope.user.authCode);
            user.setFlag(UserTO.BIND_MOBILE);
            console.debug('提交绑定手机的user:\n' + JSON.stringify(user));
            Task.getUserInfo(user).then(
                function (result) {
                    var ret = angular.fromJson(result.data);
                    console.debug('提交绑定手机网络回调:\n' + JSON.stringify(ret));
                    var code = ret['code'];
                    var desc = ret['desc'];
                    var msg = angular.fromJson(ret['msg']);

                    if (code == UserTO.RESULT_OK) {
                        user.setUser(msg);
                        console.debug('提交绑定手机后的User:\n' + JSON.stringify(user));
                        // todo 关闭窗口 登录回调
                        $ionicLoading.hide();
                    } else {
                        $ionicLoading.hide();
                        if (desc == null || desc == '') {
                            PluginUtil.showAlert('很抱歉，绑定失败，请重试一次...', null);
                        } else {
                            PluginUtil.showAlert(desc, null);
                        }
                    }

                }, function (error) {
                    $ionicLoading.hide();
                    PluginUtil.showAlert('系统或网络异常，请稍后重试！', null);
                });
        }

        $scope.init();

    }])

    .controller('PasCtrl', ['$scope', '$state', '$stateParams', 'PluginUtil', '$ionicLoading', '$ionicHistory', '$interval', 'User', 'UserTO', 'Task', 'Database', function ($scope, $state, $stateParams, PluginUtil, $ionicLoading, $ionicHistory, $interval, User, UserTO, Task, Database) {
        $scope.user = {};
        var from = $stateParams.from;
        var data = $stateParams.data;
        var user = new UserTO();

        $scope.init = function () {
            if (from == 'PasReset') {
                user.setUser(data);
                $scope.user.fromReset = true;
            } else if (from == 'PasModify') {
                user.setUser(data);
                $scope.user.fromReset = false;
            }
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

            if (from == 'PasModify') {
                if (!$scope.user.oldPassword || !reg2.test($scope.user.oldPassword)) {
                    PluginUtil.toastShortTop("请正确填写旧密码")
                    return false;
                }
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
    }])