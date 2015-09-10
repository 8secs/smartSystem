(function(){
    'use strict';

    angular.module('smartsys')
        .controller('WebCtrl', function($rootScope,
                                        $state,
                                        $stateParams,
                                        $scope,
                                        $auth,
                                        $log,
                                        $translate,
                                        GlobalService,
                                        ProfileService,
                                        alertService){

            $rootScope.stylesheets = [
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/styles.css', type: 'text/css'}//,
                /*
                *   TODO: ver como podemos cargar desde auth sus propios CSS
                 */
                //{href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/auth.css', type: 'text/css'}
            ];

            $rootScope.addStylesheet = function(stylesheet){
                $rootScope.stylesheets.push(stylesheet);
            };

            /*
            $scope.userProfile = null;

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            $scope.isAdmin = function(){
                return $scope.userProfile.user ? $scope.userProfile.user.isAdmin : false;
            };

            /**
             * Get user's profile information.

            $scope.getUser = function() {

                var promise = ProfileService.getUser();
                promise.then(
                    function(data){
                        $scope.userProfile = data;
                    },
                    function(error){
                        alertService.add('error', error);
                    });
            };
             */
            $scope.setWebIncludes = function(include){
                var url = 'themes/'+ $scope.config.activeTheme+'/includes/'+include+'.html';
                return url;
            };

            $scope.header = $scope.setWebIncludes('header');
            $scope.footer = $scope.setWebIncludes('footer');

            $scope.currentLocale = null;

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
//# sourceMappingURL=controllers.js.map