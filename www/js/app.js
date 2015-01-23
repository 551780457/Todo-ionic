var db = null;

angular.module('todo.io', ['ionic','ngCordova','zy.config', 'todo.io.directives', 'todo.io.filters', 'todo.io.services', 'todo.io.controllers', 'nsPopover'])

    .run(function ($ionicPlatform, $rootScope, $cordovaSplashscreen, DB,$cordovaSQLite) {


        $rootScope.site = 'http://172.16.44.191:8080/auser/action/do.htm';
        $ionicPlatform.ready(function () {
            DB.init($cordovaSQLite);
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            $cordovaSplashscreen.hide()
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.timeout = 5000;

        $stateProvider
            .state('login', {
                url: "/",
                templateUrl: "templates/account-login.html",
                controller: 'LoginCtrl'
            })

            .state('telbindtips', {
                url: '/password/bindtips',
                templateUrl: "templates/tel-bind-tips.html",
                controller: 'TelBindTipsCtrl'
            })

            .state('reg', {
                url: '/reg',
                templateUrl: "templates/account-reg.html",
                controller: 'AccountCtrl'
            })

            .state('verifyuser',{
                url:"/password/verifyuser",
                templateUrl: "templates/verify-user.html",
                controller: 'VerifyUserCtrl'
            })

            .state('verifytel', {
                url: '/password/verifytel',
                params:{from:null,data:null },
                templateUrl: 'templates/verify-tel.html',
                controller: 'VerifyTelCtrl'
            })

            .state('pasreset',{
                url: '/password/pasreset',
                params:{from:null,data:null },
                templateUrl: 'templates/pas-reset.html',
                controller: 'PasCtrl'
            })

            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/user-center.html",
                        controller: 'UserCenterCtrl'
                    }
                }
            })
            .state('tabs.gift', {
                url: "/gift",
                views: {
                    'gift-tab': {
                        templateUrl: "templates/account-login.html",
                        controller: 'UserCenterCtrl'
                    }
                }
            })
            .state('tabs.service', {
                url: "/service",
                views: {
                    'service-tab': {
                        templateUrl: "templates/user-center.html",
                        controller: 'UserCenterCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/');
    });

