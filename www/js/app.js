angular.module('todo.io', ['ionic', 'todo.io.directives', 'todo.io.filters', 'todo.io.services', 'todo.io.controllers', 'nsPopover'])

    .run(function ($ionicPlatform, $rootScope) {

        $rootScope.point = 'http://172.16.41.51:8080/test/s.do';
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.timeout = 5000;

        $stateProvider
            .state('account', {
                url: "/",
                templateUrl: "templates/account-login.html",
                controller: 'AccountCtrl'
            })

            .state('reg', {
                url: '/reg',
                templateUrl: "templates/account-register.html",
                controller: 'AccountCtrl'
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
                        templateUrl: "templates/user_center.html",
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
                        templateUrl: "templates/user_center.html",
                        controller: 'UserCenterCtrl'
                    }
                }
            })
        $urlRouterProvider.otherwise('/');
    });

