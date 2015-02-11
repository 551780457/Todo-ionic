window.HOST = "http://zlapp.weiweibao.com/";
//window.HOST = "http://119.4.99.166/";
window.Ver = "1.4"
//window.HOST = "http://192.168.1.106:82/";
/**
 * 数据接口api
 */
app.factory("dataApi", [function () {
    const NET = HOST + "cofcoapi/";                                                           //.net数据接口
    const PHP = HOST + "shop/";                                                               //php数据接口
    return {
        "NET": NET,
        "login": NET + "LoginByPhonePwd",                                                      //会员登录
        "keyCode": NET + "SendVerificationCode",                                               //短信接口
        "SendVerificationCode": NET + "SendVerificationCode",                                  //短信接口
        "CheckBinding": NET + "CheckBinding",                                                  //验证绑定
        "RegisterByMyInfo": NET + "RegisterByMyInfo",                                          //明源会员注册
        "BindByMyInfo": NET + "BindByMyInfo",                                                  //明源会员绑定
        "bindingZZLList": NET + "GetAccountWYMemberInfo",                                      //天问获取小区信息列表
        "BindByTWInfo": NET + "BindByTWInfo",                                                  //天问会员绑定
        "GetOutDataByMobilePhone": NET + "GetOutDataByMobilePhone",                            //
        "GetAccountWYMemberInfo": NET + "GetAccountWYMemberInfo",                              //    
        "SubmitAccountBindingWy": NET + "SubmitAccountBindingWy",                              //账号密码绑定物业
        "DelWYMemberInfo": NET + "DelWYMemberInfo",                                            //删除物业
        "GetWyInformation": NET + "GetWyInformation",                                          //天问-物业通知,小区公告
        "featuredProducts": PHP + "index.php?g=Wap&m=ShopApp&a=getRecommendGoods",             //推荐商品
        "getProductInfo": PHP + "/index.php?g=Wap&m=ShopApp&a=getProductInfo",                 //商品详情
        "getRecommendClassly": PHP + "/index.php?g=Wap&m=ShopApp&a=getRecommendClassly",       //推荐分类
        "getClasslyProduct": PHP + "/index.php?g=Wap&m=ShopApp&a=getClasslyProduct",           //分类产品列表
        "getProductClassly": PHP + "/index.php?g=Wap&m=ShopApp&a=getProductClassly",           //所有分类
        "GetADList": NET + "GetADList",                                                        //广告获取
        "GetWYPropertyList": NET + "GetWYPropertyList",                                        //住这里-小区列表l
        "GetWYPropertyInfo": NET + "GetWYPropertyInfo",                                        //住这里-小区详情
        "GetWYMemberInfo": NET + "GetWYMemberInfo",                                            //住这里-获取我的小区列表
        "WXPay": NET + "WXPay",                                                                //天问物业缴费
        "GetDebtsFeeSearch": NET + "GetDebtsFeeSearch",                                        //天问-欠费查询
        "GetPaidFeeSearch": NET + "GetPaidFeeSearch",                                          //天问-实缴查询
        "GetDueFeeSearch": NET + "GetDueFeeSearch",                                            //住这里-应缴查询
        "GetOffsetPreSearch": NET + "GetOffsetPreSearch",                                      //预存冲抵
        "GetPay": "",                                                                          //支付链接
        "Submit_WY_Repair": NET + "Submit_WY_Repair",                                          //天问-在线保修
        "GetRepairList": NET + "GetRepairList",                                                //天问-报修列表
        "GetRepairInfo": NET + "GetRepairInfo",                                                //天问-报销详情
        "GetIntegralProductList": NET + "GetIntegralProductList",                              //悦客会-积分商城-商品列表
        "GetIntegralProductInfo": NET + "GetIntegralProductInfo",                              //积分商品详情
        "GetMyActivityList": NET + "GetMyActivityList",                                        //我的活动列表
        "GetActivityList": NET + "GetActivityList",                                            //活动列表
        "GetActivityInfo": NET + "GetActivityInfo",                                            //活动详情
        "SubmitActivitySignUp": NET + "SubmitActivitySignUp",                                  //活动-参加活动
        "GetCouponList": NET + "GetCouponList",                                                //优惠券-获取列表
        "GetAllianceMerchantList": NET + "GetAllianceMerchantList",                            //联盟商家列表（悦客会）
        "GetAllianceMerchantInfo": NET + "GetAllianceMerchantInfo",                            //联盟商家详情（悦客会）
        "GetIntegralProductList": NET + "GetIntegralProductList",                              //积分商城-获取积分商品列表（悦客会）
        "GetIntegralProductInfo": NET + "GetIntegralProductInfo",                              //积分商城-获取积分商品详情（悦客会）
        "SubmitIntegralOrder": NET + "SubmitIntegralOrder",                                    //积分商城-提交积分订单（悦客会）
        "GetIntegralProductOrderList": NET + "GetIntegralProductOrderList",                    //积分商城-获取订单列表（悦客会）
        "GetIntegralProductOrderInfo": NET + "GetIntegralProductOrderInfo",                    //积分商城-获取订单详情（悦客会）
        "GetIntegralPrizeList": NET + "GetIntegralPrizeList",                                  //积分商城-获取积分消费（悦客会）
        "GetIntegralPointList": NET + "GetIntegralPointList",                                  //积分商城-获取积分累计（悦客会）
        "DelIntegralOrder": NET + "DelIntegralOrder",                                          //积分商城-删除订单
        "GetAllProjectList": NET + "GetAllProjectList",                                        //项目营销-全部项目列表
        "GetProjectList": NET + "GetProjectList",                                              //项目营销-项目分页列表
        "GetProjectInfo": NET + "GetProjectInfo",                                              //项目营销-项目详情
        "SubmitVisitAppoint": NET + "SubmitVisitAppoint",                                      //项目营销-提交购房预约
        "GetVisitAppointByProjectID": NET + "GetVisitAppointByProjectID",                      //项目营销-购房预约
        "GetTradeList": NET + "GetTradeList",                                                  //项目营销-获取购房进度列表
        "GetTradeInfo": NET + "GetTradeInfo",                                                  //项目营销-获取购房进度详情
        "GetTradeFee": NET + "GetTradeFee",                                                    //项目营销-购房进度交易明细
        "GetTradeGetin": NET + "GetTradeGetin",                                                //项目营销-购房进度款项明细
        "RegisterAgentBrokerInfo": NET + "RegisterAgentBrokerInfo",                            //项目营销-全民经纪人-个人信息
        "GetAgentBrokerInfo": NET + "GetAgentBrokerInfo",                                      //项目营销-全民经纪人-获取信息
        "GetAgentProList": NET + "GetAgentProList",                                            //项目营销-全民经纪人-获取项目列表
        "SubmitAgentRecommend": NET + "SubmitAgentRecommend",                                  //项目营销-全民经纪人-提交推荐
        "GetAgentRecommendNum": NET + "GetAgentRecommendNum",                                  //项目营销-全民经纪人-获取推荐数量
        "GetAgentRecommendNum": NET + "GetAgentRecommendNum",                                  //项目营销-全民经纪人-获取推荐数量
        "GetAgentClient": NET + "GetAgentClient",                                              //项目营销-全民经纪人-获取到访用户
        "GetUsersVisit": NET + "",                                                             //项目营销-全民经纪人-获取到访用户
        "GetHS_CluList": NET + "GetHS_CluList",                                                //会所-获取会所列表
        "GetClubBookingType": NET + "GetClubBookingType",                                      //会所-预定分类
        "GetClubBookingList": NET + "GetClubBookingList",                                      //会所-预定项目列表
        "GetClubBookingInfo": NET + "GetClubBookingInfo",                                      //会所-预定项目列表
        "SubmitClubBookingOrder": NET + "SubmitClubBookingOrder",                              //会所-提交预定订单
        "GetClubBookingOrderList": NET + "GetClubBookingOrderList",                            //会所-预定订单列表
        "GetClubBookingOrderInfo": NET + "GetClubBookingOrderInfo",                            //会所-预定订单详情
        "GetCustomeCenterList": NET + "GetCustomeCenterList",                                  //在线客服-导航
        "CustomerService": NET + "",                                                           //在线客服-在线聊天
        "UpdateAccountInfo": NET + "UpdateAccountInfo",                                        //账号管理-修改账号信息
        "ForgotPassword": NET + "",                                                            //账号管理-找回密码
        "UpdatePwd": NET + "UpdatePwd",                                                        //账号管理-找回密码
        "GetAccountInfo": NET + "GetAccountInfo",                                              //账号管理-获取账号信息
        "Withdrawals": NET + "",                                                               //账号管理-全民经济人提现账号
        "GetInformationManageList": NET + "GetInformationManageList",                          //资讯列表
        "GetInformationManageInfo": NET + "GetInformationManageInfo",                          //资讯详情
        "Update": NET + "Update",                                                              //获取下载
        "GetCustomTable": NET + "GetCustomTable",                                              //获取问卷调查列表
        "GetCustomTableColumn": NET + "GetCustomTableColumn",                                  //获取问卷调查详情
        "SendCustomTable": NET + "SendCustomTable",                                            //提交问卷调查
        "GetCouponResultList": NET + "GetCouponResultList",                                    //我的优惠券
        "MyWarrants": NET + "MyWarrants",                                                      //我的权证
        "GetActivityInfo": NET + "GetActivityInfo",                                            //活动详情
        "SubmitActivitySignUp": NET + "SubmitActivitySignUp",                                  //活动-参加活动
        "GetCouponList": NET + "GetCouponList",                                                //优惠券-获取列表
        "GetCouponInfo": NET + "GetCouponInfo",                                                //优惠券-获取详情
        "TakeCoupon": NET + "TakeCoupon",                                                      //优惠券-领取
        "GetAllianceMerchantList": NET + "GetAllianceMerchantList",                            //联盟商家列表（悦客会）
        "GetAllianceMerchantInfo": NET + "GetAllianceMerchantInfo",                            //联盟商家详情（悦客会）
        "GetIntegralProductList": NET + "GetIntegralProductList",                              //积分商城-获取积分商品列表（悦客会）
        "GetIntegralProductInfo": NET + "GetIntegralProductInfo",                              //积分商城-获取积分商品详情（悦客会）
        "SubmitIntegralOrder": NET + "SubmitIntegralOrder",                                    //积分商城-提交积分订单（悦客会）
        "GetIntegralProductOrderList": NET + "GetIntegralProductOrderList",                    //积分商城-获取订单列表（悦客会）
        "GetIntegralPrizeList": NET + "GetIntegralPrizeList",                                  //积分商城-获取积分消费（悦客会）
        "GetIntegralPointList": NET + "GetIntegralPointList",                                  //积分商城-获取积分累计（悦客会）
        "GetAllProjectList": NET + "GetAllProjectList",                                        //项目营销-全部项目列表
        "GetProjectList": NET + "GetProjectList",                                              //项目营销-项目分页列表
        "GetProjectInfo": NET + "GetProjectInfo",                                              //项目营销-项目详情
        "SubmitVisitAppoint": NET + "SubmitVisitAppoint",                                      //项目营销-提交购房预约
        "GetVisitAppointByProjectID": NET + "GetVisitAppointByProjectID",                      //项目营销-购房预约
        "GetTradeList": NET + "GetTradeList",                                                  //项目营销-获取购房进度列表
        "GetTradeInfo": NET + "GetTradeInfo",                                                  //项目营销-获取购房进度详情
        "GetTradeFee": NET + "GetTradeFee",                                                    //项目营销-购房进度交易明细
        "GetTradeGetin": NET + "GetTradeGetin",                                                //项目营销-购房进度款项明细
        "RegisterAgentBrokerInfo": NET + "RegisterAgentBrokerInfo",                            //项目营销-全民经纪人-个人信息
        "GetAgentBrokerInfo": NET + "GetAgentBrokerInfo",                                      //项目营销-全民经纪人-获取信息
        "GetAgentProList": NET + "GetAgentProList",                                            //项目营销-全民经纪人-获取项目列表
        "SubmitAgentRecommend": NET + "SubmitAgentRecommend",                                  //项目营销-全民经纪人-提交推荐
        "GetAgentRecommendNum": NET + "GetAgentRecommendNum",                                  //项目营销-全民经纪人-获取推荐数量
        "GetAgentRecommendNum": NET + "GetAgentRecommendNum",                                  //项目营销-全民经纪人-获取推荐数量
        "GetAgentClient": NET + "GetAgentClient",                                              //项目营销-全民经纪人-获取到访用户
        "GetUsersVisit": NET + "",                                                             //项目营销-全民经纪人-获取到访用户
        "GetClubBookingType": NET + "GetClubBookingType",                                      //会所-预定分类
        "GetClubBookingList": NET + "GetClubBookingList",                                      //会所-预定项目列表
        "GetClubBookingInfo": NET + "GetClubBookingInfo",                                      //会所-预定项目列表
        "SubmitClubBookingOrder": NET + "SubmitClubBookingOrder",                              //会所-提交预定订单
        "GetClubBookingOrderList": NET + "GetClubBookingOrderList",                            //会所-预定订单列表
        "GetClubBookingOrderInfo": NET + "GetClubBookingOrderInfo",                            //会所-预定订单详情
        "HSClubInfo": NET + "GetHS_ClubInfo",                                                  //会所-会所信息
        "GetHSMemberInfo": NET + "GetHS_MemberInfo",                                           //会所-会员身份
        "GetCustomeCenterList": NET + "GetCustomeCenterList",                                  //在线客服-导航
        "CustomerService": NET + "",                                                           //在线客服-在线聊天
        "UpdateAccountInfo": NET + "UpdateAccountInfo",                                        //账号管理-修改账号信息
        "ForgotPassword": NET + "",                                                            //账号管理-找回密码
        "Withdrawals": NET + "",                                                               //账号管理-全民经济人提现账号
        "GetInformationManageList": NET + "GetInformationManageList",                          //资讯列表
        "GetInformationManageInfo": NET + "GetInformationManageInfo",                          //资讯详情
        "Update": NET + "Update",                                                              //版本更新
        "GetBank": NET + "GetBank",                                                            //获取支付方式
        "GetOnLinePayList": NET + "GetOnLinePayList",                                          //获取支付列表
        "GetOnLinePayInfo": NET + "GetOnLinePayInfo",                                          //获取支付列表详情
        "GetSelectThing": NET + "GetSelectThing",                                              //获取选择项
        "CommCheckKey": NET + "CommCheckKey",
        "ChatSendMessage": NET + "Chat_SendMessage",                                           //在线客服发送消息
        "GetChat": NET + "GetChat",                                                            //获取消息
        "checkUserInfo": NET + "checkUserInfo",
        "ModifyPwd": NET + "ModifyPwd",
        "CheckCouponPWD": NET + "CheckCouponPWD",
        "GetCard": NET + "GetCard",
        "GetCouponResult": NET + "GetCouponResult",
        "GetVisitInfo": NET + "GetVisitInfo",
        "GetWYProperty": NET + "GetWYProperty"
    }
}]);

/**
 * 数据存储
 */
app.service("DB", [function () {
    var sql = {
        createTableUser: "CREATE TABLE IF NOT EXISTS USER(id integer primary key,userID TEXT,name TEXT,imgUrl TEXT,status NUMBER)",//id,名字,头像路径,状态
        deleteTable: "DROP TABLE USER",//删除用户表
        selectUserID: "SELECT id,userID,name,imgUrl,status FROM USER WHERE userID = ?", //查询用户值
        insertUser: "INSERT INTO USER(userID,name,imgUrl,status) VALUES(?,?,?,?)",//用户字段插入
        deleteUserID: "DELETE FROM USER WHERE userID = ?"//删除用户
    }

    function DB() {
        this.DBNAME = "cofco";         //数据库名字
        this.VERSION = "1.0";          //版本号码
        this.DES = "中粮APP数据库";    //数据库描述
        this.SIZE = 5000;              //数据库大小
        this.db = window.openDatabase(this.DBNAME, this.VERSION, this.DES, this.SIZE);
        this.init = function () {
            this.db.transaction(function (tx) {
                tx.executeSql(sql.createTableUser);
            });
        };
        this.dbError = function (tx, error) {
            console.error(error);
        };
    }

    DB.prototype.findUserID = function (userID, callback) {
        this.db.transaction(function (tx) {
            tx.executeSql(sql.selectUserID, [userID], function (tx, result) {
                callback(result);
            }, function (error) {
                console.error(error);
            });
        });
    }

    DB.prototype.updateUser = function (id, params, callback) {
        this.db.transaction(function (tx) {
            tx.executeSql("UPDATE USER SET " + params + " WHERE userID = ?", [id], function (tx, result) {
                callback(result);
            }, function (error) {
                console.error(error);
            });
        });
    }

    DB.prototype.insertUser = function (userObj, callback) {
        var _this = this;
        this.db.transaction(function (tx) {
            tx.executeSql(sql.insertUser, [userObj.userID, userObj.name, userObj.imgUrl, userObj.status], function (tx, result) {
                callback((result.rowsAffected == 1) ? true : false);
            }, function (error) {
                console.error(error);
            });
        });
    }

    DB.prototype.deleteUserID = function (id, callback) {
        this.db.transaction(function (tx) {
            tx.executeSql(sql.deleteUserID, [id], function (tx, result) {
                callback(result);
            }, function (error) {
                console.error(error);
            });
        });
    }

    return DB;
}]);

/**
 * 数据持久化
 */
app.service("Storage", ['$window', function ($window) {
    function Storage() { }

    /**
     * 根据key清除值
     * @params key 必填
     */
    Storage.prototype.clear = function () {
        if (arguments[0]) {
            window.localStorage.removeItem(arguments[0]);
        } else {
            throw new Error("key值不能为空，必填");
        }
    }

    Storage.prototype.clearAll = function () {
        window.localStorage.clear();
    }

    Storage.prototype.setValue = function (key, value) {
        var valString = (typeof value === "object") ? JSON.stringify(value) : value;
        try {
            window.localStorage.setItem(key, valString);
            return 1;
        } catch (error) {
            console.error(error.message);
            return 0;
        }
    }

    Storage.prototype.getValue = function (key) {
        var valObj = window.localStorage.getItem(key) || null;
        var obj = {};
        try {
            obj = JSON.parse(valObj);
        } catch (error) {
            obj = valObj;
        }
        return obj;
    }

    return Storage;
}]);

/**
 * 获取用户信息
 * */
app.factory("_User", ["Storage", function (Storage) {
    var _Storage = new Storage();
    return function () {
        var jUser = _Storage.getValue("User");
        return {
            AppID: jUser.AppID,
            Name: jUser.Name,
            Phone: jUser.Phone,
            Integral: jUser.Integral,
            MaxMemlevel: jUser.MaxMemlevel,
            Pic: jUser.Pic,
            Address: jUser.Address
        };
    }
}]);

/**
 * 状态提示数据接口
 */
app.factory("statusSocketServices", [function () {
    return {
        "statusClassName": "ion-happy-outline",
        "contentText": "欢迎你来到悦客会，我们将为您提供无微不至的在线服务",
        "buttonClassName": "button-energized",
        "buttonText": "进入悦生活",
        "buttonLink": "#/tabs/index"
    }
}]);

/**
 * AJAX封装
 */
app.factory("AJAX", ['$q', '$ionicLoading', 'dataApi', '$http', '$ionicPopup', '$window', '$location', function ($q, $ionicLoading, dataApi, $http, $ionicPopup, $window, $location) {
    //$http.defaults.headers.common['auth-token'] = AppKey;
    return {
        "data": function (url, params, method, tf) {
            var val = $window.sessionStorage.getItem(url + $location.path()),
                defer = $q.defer();
            method = method || "GET";
            if (method == "GET") {
                if (!val) {
                    //if (true) {
                    $ionicLoading.show({ template: '<span class="icon ion-load-c f-3"></span>' });
                    $http({
                        method: "GET",
                        url: dataApi[url],
                        params: params,
                        cache: false,
                        timeout: 10000,
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function (result) {
                        $ionicLoading.hide();
                        defer.resolve(result);
                        if (tf)
                            $window.sessionStorage.setItem(url + $location.path(), JSON.stringify(result));
                    }).catch(function () {
                        $ionicLoading.hide();
                        defer.reject(resut);
                    });
                } else {
                    defer.resolve(JSON.parse(val));
                }
            } else if (method == "POST") {
                $ionicLoading.show({ template: '<span class="icon ion-load-c f-3"></span>' });
                $http({
                    method: "POST",
                    url: dataApi[url],
                    data: params,
                    cache: false,
                    timeout: 10000,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function (obj) {
                        return $.param(obj);
                    }
                }).then(function (result) {
                    $ionicLoading.hide();
                    defer.resolve(result);
                    $window.sessionStorage.setItem(url + $location.path(), JSON.stringify(result));
                }).catch(function () {
                    $ionicLoading.hide();
                    defer.reject(result);
                });
            }
            else if (method == "GET-OPTIONS") {
                $ionicLoading.show({ template: '<span class="icon ion-load-c f-3"></span>' });
                $http({
                    method: "GET",
                    url: dataApi[url],
                    params: params,
                    cache: false,
                    timeout: 10000,
                    headers: { 'Content-Type': 'application/json', "auth-token": AppKey }
                }).then(function (result) {
                    $ionicLoading.hide();
                    defer.resolve(result);
                    $window.sessionStorage.setItem(url + $location.path(), JSON.stringify(result));
                }).catch(function () {
                    $ionicLoading.hide();
                    defer.reject(resut);
                });
            }
            return defer.promise;
        }
    }
}]);

/**
 * 时间列表
 */
app.factory("optionDate", [function () {
    return {
        "dateList": function () {
            var myDate = new Date();
            var nowYear = myDate.getFullYear();
            var nowMonth = myDate.getMonth() + 1;
            var dateList = [];
            for (var j = nowMonth; j > 1; j--) {
                var obj = new Object();
                obj.a = nowYear + "-" + j;
                obj.b = nowYear + "年" + j + "月";
                dateList.push(obj);
            }
            for (var i = 0; i <= 12 - nowMonth; i++) {
                var obj = new Object();
                obj.a = (nowYear - 1) + "-" + (12 - i);
                obj.b = (nowYear - 1) + "年" + (12 - i) + "月";
                dateList.push(obj);
            }
            return dateList;
        }
    };
}]);

//积分商城购物车
app.factory("IntegralShopCart", [function () {
    return {
        "Add": function (ProductID, Num, Name, Integral, Pic) {
            var shopCart = this.Get();
            var Item = { ProductID: ProductID, Num: Num, Name: Name, Integral: Integral, Pic: Pic };

            if (!shopCart || shopCart == null) {
                shopCart = new Array();
                shopCart.push(Item);
            }
            else {
                var IsExits = false;
                angular.forEach(shopCart, function (value, key) {
                    //delete shopCart[key];
                    //shopCart.put();
                    if (value.ProductID == ProductID) {
                        shopCart[key] = Item;
                        IsExits = true;
                    }
                });
                if (!IsExits) {
                    shopCart.push(Item);
                }
            }
            this.Set(shopCart);
        },
        "Del": function (ProductID) {
            var shopCart = this.Get();

            var IsDel = false;
            angular.forEach(shopCart, function (count, key) {
                if (IsDel) return;
                if (value.ProductID == ProductID) {
                    $scope.shopCart.splice(key, 1);
                }
            });
            this.Set(shopCart);
        },
        "Clear": function () {
            var shopCart = null;
            this.Set(shopCart);
        },
        "Get": function () {
            var shopCart = window.sessionStorage.getItem("ShopCart");

            return JSON.parse(shopCart);
        },
        "Set": function (shopCart) {
            window.sessionStorage.setItem("ShopCart", JSON.stringify(shopCart));
        }
    }
}]);

app.factory("OpenUrl", [function () {
    return {
        "SystemChorme": function (Url) {
            //location.href = Url;
            window.open(Url, '_system');
        }
    }
}]);

app.factory("cordovaReady", ["AJAX", "OpenUrl", '$ionicPopup', '$q', function (AJAX, OpenUrl, $ionicPopup, $q) {
    var _appVer = window.Ver;
    var obj = {
        "onDeviceReady": function (AppID) {
            var _this = this;
            document.addEventListener("jpush.setTagsWithAlias", onTagsWithAlias, false);
            document.addEventListener('deviceready', function () {
                var db = window.sqlitePlugin.openDatabase({ name: "my.db" });
                db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Chat_Msg (id integer primary key,AppID text, ChatID integer,Modules text, Authority text ,Content text, MessageType integer ,IsRead integer,CreateTime text)');
                });
                _this.InitjPush(AppID);
            }, false);

            var onTagsWithAlias = function (event) {
                try {
                    var result = "result code:" + event.resultCode + " ";
                    result += "tags:" + event.tags + " ";
                    result += "alias:" + event.alias + " ";
                    console.log(result);
                }
                catch (exception) {
                    console.log(exception)
                }
            }

            /*
            var InitjPush = function (AppID) {
                console.log("init jpush");
                window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
                window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
                window.plugins.jPushPlugin.init();
                window.plugins.jPushPlugin.resumePush();
                window.plugins.jPushPlugin.setTagsWithAlias([], AppID);
                console.log("init jpush");
            }

            var onTagsWithAlias = function (event) {
                try {
                    var result = "result code:" + event.resultCode + " ";
                    result += "tags:" + event.tags + " ";
                    result += "alias:" + event.alias + " ";
                    console.log(result);
                }
                catch (exception) {
                    console.log(exception)
                }
            }
            var onGetRegistradionID = function (data) {
                try {
                    console.log("JPushPlugin:registrationID is " + data)


                }
                catch (exception) {
                    console.log(exception);
                }
            }*/
        },
        "InitjPush": function (AppID) {
            var platform = "";
            try {
                platform = device.platform;
            }
            catch (error) {
                return;
            }

            if (platform == "Android" || platform == "iOS") {

                var db = window.sqlitePlugin.openDatabase({ name: "my.db" });
                db.transaction(function (tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Chat_Msg (id integer primary key,AppID text, ChatID integer,Modules text, Authority text ,Content text, MessageType integer ,IsRead integer,CreateTime text)');
                });

                //var InitjPush = function (AppID) {
                console.log("init jpush");
                window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
                window.plugins.jPushPlugin.init();
                window.plugins.jPushPlugin.resumePush();
                window.plugins.jPushPlugin.setTagsWithAlias([], AppID);
                //}
            }
            else { return; }

            var onTagsWithAlias = function (event) {
                try {
                    var result = "result code:" + event.resultCode + " ";
                    result += "tags:" + event.tags + " ";
                    result += "alias:" + event.alias + " ";
                    console.log(result);
                }
                catch (exception) {
                    console.log(exception)
                }
            }
            var onGetRegistradionID = function (data) {
                try {
                    console.log("JPushPlugin:registrationID is " + data)
                }
                catch (exception) {
                    console.log(exception);
                }
            }
        },
        "checkVersion": function () {

            var resultData = AJAX.data('Update', { AppType: "android" });
            resultData.then(function (result) {
                if (result.data.status == 1) {
                    data = result.data.data;
                    //console.log("版本信息：" + JSON.stringify(data));
                    if (obj.GetAppVer(data.ver) > obj.GetAppVer(_appVer)) {
                        var confirmPopup = $ionicPopup.confirm({
                            title: '新版本检测',
                            template: '检查到新版本APP，是否立即更新?',
                            cancelText: "取消",
                            okText: "更新",
                            okType: "button-energized"
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                OpenUrl.SystemChorme(data.url);
                            } else {
                                console.log('no');
                            }
                        });
                    }
                }
            });
        },
        "GetAppVer": function (Ver) {
            return parseInt(Ver.split(".")[1]);
        },
        "GetServerVer": function () {
            var resultData = AJAX.data('Update', { AppType: "android" });
            defer = $q.defer();
            resultData.then(function (result) {
                var VerInfo = { CurrentVer: _appVer, NewVer: null };
                if (result.data.status == 1) {
                    data = result.data.data;
                    //console.log("版本信息：" + JSON.stringify(data));
                    if (obj.GetAppVer(data.ver) > obj.GetAppVer(_appVer)) {
                        //var confirmPopup = $ionicPopup.confirm({
                        //    title: '新版本检测',
                        //    template: '检查到新版本APP，是否立即更新?',
                        //    cancelText: "取消",
                        //    okText: "更新",
                        //    okType: "button-energized"
                        //});
                        //confirmPopup.then(function (res) {
                        //    if (res) {
                        //        OpenUrl.SystemChorme(data.url);
                        //    } else {
                        //        console.log('no');
                        //    }
                        //});
                        VerInfo.NewVer = data;
                    }
                }

                defer.resolve(VerInfo);
            });

            return defer.promise;
        }
    }
    return obj;
}]);

/**
 * 图片上传
 */
app.factory("PhotoUpload", ['_User', 'dataApi', '$ionicLoading', function (_User, dataApi, $ionicLoading) {
    var PicServer;
    return {
        "CAMERA": function () {
            console.log("CAMERA");
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI
                //sourceType: Camera.PictureSourceType.CAMERA,
                //encodingType: Camera.EncodingType.JPEG,
                //popoverOptions: CameraPopoverOptions
            }
            this.UPLOADPICTURE(options);
        },
        "PHOTOLIBRARY": function () {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }
            this.UPLOADPICTURE(options);
        },
        "PICURL": "",
        "UPLOADPICTURE": function (options) {
            var _this = this;
            PicServer = dataApi["NET"] + "PicUpdata";
            var platform = device.platform;
            console.log("Platform:" + platform);
            navigator.camera.getPicture(function (data) {
                console.log(data);
                //$scope.MemberInfo.Pic = data;
                //scope.MemberInfo.Pic = data;
                uploadPicture(data);
            }, null, options);

            var uploadPicture = function (imageURI) {
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";

                var ft = new FileTransfer();
                if (platform == "Android") {
                    ft.onprogress = showUploadingProgress;
                    navigator.notification.progressStart("", "当前上传进度");
                } else {
                    $ionicLoading.show({ template: '<i class="icon ion-load-c f-3"></i>' });
                }

                ft.upload(imageURI, encodeURI(PicServer), function (backData) {
                    console.log(backData.response);
                    data = JSON.parse(backData.response);
                    if (platform == "Android") {
                        navigator.notification.progressStop();
                    }
                    else {
                        $ionicLoading.hide();
                    }
                    if (data.status == 1) {
                        //navigator.notification.progressStop();
                        $("#Pic").attr("src", imageURI);
                        _this.PICURL = data.data;
                        //User.Pic = data.data;                       
                        //var FStorage = new Storage();
                        //var JsonUser = FStorage.getValue("User");
                        //JsonUser.Pic = User.Pic;
                        //FStorage.setValue("User", JsonUser);
                    }
                    else {
                        alert("上传失败");
                    }

                }, null, options);


                // 显示上传进度
                function showUploadingProgress(progressEvt) {
                    if (progressEvt.lengthComputable) {
                        navigator.notification.progressValue(Math.round((progressEvt.loaded / progressEvt.total) * 100));
                    }
                }

                // 从缓存中删除图片
                function deletePictureFromCache(imageURI) {
                    window.resolveLocalFileSystemURI(fileURI, function (fileEntry) {
                        fileEntry.remove();
                    }, null);
                }

            }

        }
    }
}]);

