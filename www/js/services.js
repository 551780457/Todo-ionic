angular.module('todo.io.services', ['zy.config'])

    .service('Task', function task($http, $q, $rootScope) {
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
    })

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
            imei: 'test',//ZYDevice.uuid,
            authCode: '',
            flag: -1
        };

        var result_ok = 100;
        var result_99 = 99;
        return {

            RESULT_OK: function () {
                return result_ok;
            },

            RESULT_99: function () {
                return result_99;
            },

            setUsername: function (username) {
                UserInfo.uName = username;
            },

            setPassword: function (password) {
                UserInfo.password = password;
            },

            setFlag: function (flag) {
               switch(flag){
                   case 'REG':
                       UserInfo.flag = 0;
                       break;
                   case 'LOGIN':
                       UserInfo.flag = 1;
                       break;
               }

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
                UserInfo.version = 'papa_web',
                UserInfo.imei = 'test',//ZYDevice.uuid,
                UserInfo.authCode = '',
                UserInfo.flag = -1
            }
        }
    }])

    .factory('UserTO', [function () {
        // Define the constructor function.
        function UserTO( ) {
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
            this.imei = 'test',//ZYDevice.uuid,
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
                switch(flag){
                    case 'REG':
                        this.flag = 0;
                        break;
                    case 'LOGIN':
                        this.flag = 1;
                        break;
                    case 'VERIFYUSER':
                        this.flag = 9;
                        break;
                }

            },
            setUser: function (user) {
                this.uid = user['uid'];
                this.uName = user['uName'];
                this.token = user['token'];
                this.question = user['question'];
                this.mobile = user['mobile'];

            },

            getUserName : function () {
                return this.uName;
            },

            getFirstName: function() {

                return( this.firstName );

            },

            getFullName: function() {

                return( this.firstName + " " + this.lastName );

            }
        };

        // Define the "class" / "static" methods. These are
        // utility methods on the class itself; they do not
        // have access to the "this" reference.
        UserTO.RESULT_OK = 100;
        UserTO.RESULT_99 = 99;

        // Return constructor - this is what defines the actual
        // injectable in the DI framework.
        return(UserTO);
    }])

    // DB wrapper
    .factory('DB', function ($q, DB_CONFIG) {
        var self = this;
        self.db = null;

        self.init = function () {
            // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
            //self.db = window.sqlitePlugin.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

            angular.forEach(DB_CONFIG.tables, function (table) {
                var columns = [];
                angular.forEach(table.columns, function (column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                self.query(query);
                console.log('Table ' + table.name + ' initialized');
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

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        };

        self.fetch = function (result) {
            return result.rows.item(0);
        };

        return self;
    })
    // Resource service example
    .factory('Database', function (DB) {
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
            //var password = ZYCallbackPlugin.desEncrypt(user.password, function(res){
            //    return res;
            //});
            //console.log(password);
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
    });


