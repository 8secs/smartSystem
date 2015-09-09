(function(){
    'use strict';

    angular.module('smartsys')
        .controller('PublicCtrl', function($rootScope,
                                        $state,
                                        $stateParams,
                                        $scope,
                                        $log,
                                        $translate,
                                        GlobalService,
                                        alertService){

            $rootScope.stylesheets = [
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/styles.css', type: 'text/css'},
                /*
                *   TODO: ver como podemos cargar desde auth sus propios CSS
                 */
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/auth.css', type: 'text/css'},
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/admin.css', type: 'text/css'}
            ];

            $scope.currentLocale = null;
            /*$scope.userProfile = null;
            $scope.isAuthenticated = function() {
                return false;
            };*/
            $log.log("publicCtrl");

            $scope.setWebIncludes = function(include){
                var url = 'themes/'+ $scope.config.activeTheme+'/includes/'+include+'.html';
                return url;
            };

            $scope.header = $scope.setWebIncludes('header');
            $scope.footer = $scope.setWebIncludes('footer');

            $scope.getSopportedLocales = function(){
                var promise = GlobalService.getSopportedLocales();
                promise.then(
                    function(data){
                        $scope.sopportedLocales = data.sopportedLocales;
                        $scope.currentLocale = data.currentLocale;
                        $translate.use($scope.currentLocale);
                    },
                    function(error){
                        alertService.add('error', error);
                    });
            };
            $scope.getSopportedLocales();
        });
})();