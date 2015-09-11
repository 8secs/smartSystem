(function(){
    'use strict';

    angular.module('smartsys', ['ngResource',
            'ngMessages',
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'pascalprecht.translate',
            'ngCookies',
            'ngSanitize',
            'satellizer',
            'uiGmapgoogle-maps',
            'adminsys',
            'auth'])
        .run(function($rootScope){
            $rootScope.config = _config;
        })
        .config(function(uiGmapGoogleMapApiProvider){
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCdwv6fBwKiwrRkV9E9qWWzqWjDuSucyQA',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });

        })
        .config(
            function($translateProvider){
                $translateProvider.useStaticFilesLoader({
                    prefix: 'themes/bootstrap/assets/resources/locale-',
                    suffix: '.json'
                });
                $translateProvider.determinePreferredLanguage();
                $translateProvider.useLocalStorage();
                $translateProvider.useSanitizeValueStrategy('sanitize');
        })
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('public',{
                    templateUrl: 'themes/bootstrap/layouts/web.html',
                    abstract: true,
                    controller: 'PublicCtrl'
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'themes/bootstrap/partials/home.html',
                    parent: 'public'
                })
                .state('admin',{
                    abstract: true,
                    resolve: {
                        authenticated: function($q, $location, $auth) {
                            var deferred = $q.defer();
                            if (!$auth.isAuthenticated()) {
                                //$location.path('/login');
                                console.log("noAuth");
                            } else {
                                console.log("Auth");
                                deferred.resolve();
                            }
                            return deferred.promise;
                        }
                    },
                    views: {
                        '@' : {
                            templateUrl: 'themes/bootstrap/layouts/admin.html'
                        },
                        'header@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/header.html'
                        },
                        'sidebar@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/sidebar.html',
                            controller: 'SidebarMenuCtrl'
                        },
                        'footer@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/footer.html'
                        },
                        'control@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/control-sidebar.html'
                        }
                    }
                })
                .state('dashboard',{
                    url: '/dashboard',
                    templateUrl: 'themes/bootstrap/partials/admin/dashboard.html',
                    parent: 'admin'
                })
            ;
            $urlRouterProvider.otherwise('/');
        })

})();