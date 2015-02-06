angular.module('todo.io.services', ['zy.config'])

    .service('Task', ['$http','$q','$rootScope',function task($http, $q, $rootScope) {
        var task = this;

        task.getUserInfo = function (user) {
            var defer = $q.defer();
            var req = {
                method: 'POST',
                url: $rootScope.site,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data: user,
                timeout: 8000
            }

            $http(req).then(
                function (data, status, headers, config) {
                    defer.resolve(data, status, headers, config);
                },
                function (data, status, headers, config) {
                    defer.reject(data, status, headers, config);
                }
            )
            return defer.promise;
        }
        return task;
    }])

    .factory('User', [function () {
        var UserInfo = {
            uid: 0,
            token: '',
            uName: '',
            nickName: '',
            password: '',
            mobile: '',
            mail: '',
            question: '',
            answer: '',
            version: 'papa_web',
            imei: 'test',
            //version :'papa_android',
            //imei : ZYDevice.uuid,
            authCode: '',
            flag: -1
        };

        return {
            setUsername: function (username) {
                UserInfo.uName = username;
            },

            setPassword: function (password) {
                UserInfo.password = password;
            },

            setUser: function (user) {
                UserInfo.uid = user['uid'];
                UserInfo.uName = user['uName'];
                UserInfo.token = user['token'];
                UserInfo.question = user['question'];
                UserInfo.mobile = user['mobile'];

            },

            getUser: function () {
                return UserInfo;
            },

            getUserName : function () {
                return UserInfo.uName;
            },

            getMobile: function() {
              return UserInfo.mobile;
            },

            clear: function () {
                UserInfo.uid = 0,
                UserInfo.token = '',
                UserInfo.uName = '',
                UserInfo.nickName = '',
                UserInfo.password = '',
                UserInfo.mobile = '',
                UserInfo.mail = '',
                UserInfo.question = '',
                UserInfo.answer = '',
                //UserInfo.version = 'papa_web',
                //UserInfo.imei = 'test',
                UserInfo.version = 'papa_android',
                UserInfo.imei = ZYDevice.uuid,

                UserInfo.authCode = '',
                UserInfo.flag = -1
            }
        }
    }])

    .factory('UserTO', [function () {
        // Define the constructor function.
        function UserTO() {
            this.uid = 0,
            this.token = '',
            this.uName = '',
            this.nickName = '',
            this.password = '',
            this.mobile = '',
            this.mail = '',
            this.question = '',
            this.answer = '',
            this.version = 'papa_web',
            //this.imei = ZYDevice.uuid,
            this.imei = 'test';//
            this.authCode = '',
            this.flag = -1
        }

        // Define the "instance" methods using the prototype
        // and standard prototypal inheritance.
        UserTO.prototype = {
            setUsername: function (username) {
                this.uName = username;
            },

            setPassword: function (password) {
                this.password = password;
            },

            setFlag: function (flag) {
                this.flag = flag;
            },

            setAuthCode: function(authCode) {
                this.authCode = authCode;
            },

            setMobile: function(tel) {
                this.mobile = tel;
            },

            setUser: function (user) {
                this.uid =  typeof(user['uid']) == "undefined" ? 0:user['uid'];
                this.token =  typeof(user['token']) == "undefined" ? '':user['token'];
                this.uName = typeof(user['uName']) == "undefined" ? '':user['uName'];
                this.nickName =  typeof(user['nickName']) == "undefined" ? '':user['nickName'];
                this.password =  typeof(user['password']) == "undefined" ? '':user['password'];
                this.mobile = typeof(user['mobile']) == "undefined" ? '':user['mobile'];
                this.mail = typeof(user['mail']) == "undefined" ? '':user['mail'];
                this.question = typeof(user['question']) == "undefined" ? '':user['question'];
                this.answer = typeof(user['answer']) == "undefined" ? '':user['answer'];
                this.version = 'papa_web',
                this.imei = typeof(user['imei']) == "undefined" ? '':user['imei'];
                this.authCode = typeof(user['authCode']) == "undefined" ? '':user['authCode'];
                this.flag = user['flag']
            },

            getUserName : function () {
                return this.uName;
            }
        };

        // Define the "class" / "static" methods. These are
        // utility methods on the class itself; they do not
        // have access to the "this" reference.
        UserTO.RESULT_OK = 100;
        UserTO.RESULT_99 = 99;
        UserTO.SEND_CODE_RESET_PAS = 13;
        UserTO.SEND_CODE_BIND_TEL = 12;
        UserTO.LOGIN = 1;
        UserTO.REG = 0;
        UserTO.VERIFY_USER = 9;
        UserTO.SUBMIT_AUTHCODE = 14;
        UserTO.RESET_PASSWORD = 5;
        UserTO.BIND_MOBILE = 2;

        // Return constructor - this is what defines the actual
        // injectable in the DI framework.
        return(UserTO);
    }])

    // DB wrapper
    .factory('DB',  ['$q','DB_CONFIG', '$cordovaSQLite', function ($q, DB_CONFIG, $cordovaSQLite) {
        var self = this;
        self.db = null;

        self.init = function ($cordovaSQLite) {
             if (window.navigator.platform == 'Win32') {
                console.log('websql');
                self.db = openDatabase(DB_CONFIG.name, DB_CONFIG.version, 'database', -1);
            } else {
                console.log('sqlite');
                self.db = window.sqlitePlugin.openDatabase({ name: DB_CONFIG.name });
            }

            angular.forEach(DB_CONFIG.tables, function (table) {
                var columns = [];
                angular.forEach(table.columns, function (column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                //$cordovaSQLite.execute(self.db ,query);
                self.query(query);

            });
        };

        self.query = function (query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();
            self.db.transaction(function (transaction) {
                transaction.executeSql(query, bindings, function (transaction, result) {
                    deferred.resolve(result);
                }, function (transaction, error) {
                    deferred.reject(error);
                });
            });
            return deferred.promise;
        };

        self.fetchAll = function (result) {
            var output = [];

            for (var i = 0; i < result.rows.length && i < 5; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        };

        self.fetch = function (result) {
            return result.rows.item(0);
        };

        return self;
    }])
    // Resource service example
    .factory('Database', ['DB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM users')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getUserList = function () {
            return DB.query('SELECT * FROM users ORDER BY login_date DESC')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.insert = function (user, login_date) {
            var password = user.password;
            if (window.navigator.platform == 'Win32') {
                console.debug(password);
            } else {
                ZYCallbackPlugin.desEncrypt(user.password, function(res){
                   return res;
                });
            }

            console.debug("加密密码：" + password);
            return DB.query('SELECT * FROM users WHERE uid=?', [user.uid])
                .then(function(result){
                    if(result.rows.length > 0) {
                        return DB.query('UPDATE users SET uName = ?, password = ?, token = ?, login_date = ? WHERE uid = ?', [user.uName, user.password, user.token, login_date, user.uid])
                            .then(function(result){
                                return self.getUserList();
                            });
                    }  else {
                        return DB.query('INSERT INTO users (uid, uName, password, token, login_date) VALUES (?,?,?,?,?)', [user.uid, user.uName, user.password, user.token, login_date])
                            .then(function(result){
                                return self.getUserList();
                            });
                    }
                });
        };

        self.delete = function (user){
            return DB.query('DELETE FROM users WHERE uName = ?',[user.uName])
                .then(function (result) {
                   return self.getUserList();
                });
        }
        self.dropTable = function() {
            DB.query('DROP TABLE IF EXISTS users').then(function(result){});
        }

        return self;
    }])

    .factory('PluginUtil',['$ionicPopup', function($ionicPopup){
        var self = this;
        self.toastShortTop = function(msg){
            if (window.navigator.platform == 'Win32') {
                alert(msg);
            } else {
                window.plugins.toast.showShortTop(msg);
            }
        };

        // An alert dialog
        self.showAlert = function(template,ok,success) {
            var alertPopup = $ionicPopup.alert({
                template: template,
                okText: ok == null ? '确定':ok,// String (default: 'OK'). The text of the OK button.
                okType: 'button-calm' // String (default: 'button-positive'). The type of the OK button.
            });
            alertPopup.then(success);
        };

        return self;
    }]);
