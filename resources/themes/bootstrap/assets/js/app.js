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
            'auth'
        ])
        .run(function($rootScope){
            $rootScope.config = _config;
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
                    controller: 'WebCtrl'
                })
                .state('home', {
                    url: '/',
                    templateUrl: 'themes/bootstrap/partials/home.html',
                    parent: 'public'
                });
            $urlRouterProvider.otherwise('/');
        })

})();