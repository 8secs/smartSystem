(function(){
    'use strict';

    angular.module('auth', ['ngResource',
            'ngMessages',
            'ui.router',
            'ui.bootstrap',
            'satellizer'
        ])
        .config(
            function($translateProvider){
                $translateProvider.useStaticFilesLoader({
                    prefix: 'themes/bootstrap/assets/resources/auth/locale-',
                    suffix: '.json'
                });
                $translateProvider.determinePreferredLanguage();
                $translateProvider.useLocalStorage();
                $translateProvider.useSanitizeValueStrategy('sanitize');
        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $stateProvider
                .state('auth-public',{
                    templateUrl: 'themes/bootstrap/layouts/web.html',
                    abstract: true,
                    controller: 'WebCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'themes/bootstrap/partials/login.html',
                    controller: 'LoginCtrl',
                    parent: 'auth-public'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'themes/bootstrap/partials/signup.html',
                    controller: 'SignupCtrl',
                    parent: 'auth-public'
                })
                .state('password', {
                    url: '/password',
                    templateUrl: 'themes/bootstrap/partials/password.html',
                    controller: 'LoginCtrl',
                    parent: 'auth-public'
                })
                .state('reset', {
                    url: '/reset/:token',
                    templateUrl: 'themes/bootstrap/partials/reset.html',
                    controller: 'LoginCtrl',
                    parent: 'auth-public'
                })
                .state('logout', {
                    url: '/logout',
                    template: null,
                    controller: 'LogoutCtrl'
                });

            $urlRouterProvider.otherwise('/');

            $authProvider.facebook({
                clientId: '657854390977827'
            });
        })

})();