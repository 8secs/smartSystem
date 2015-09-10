(function(){
    'use strict';

    angular.module('smartsys')
        .controller('PublicCtrl', function($rootScope,
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

                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/styles.css', type: 'text/css'}
            ];

            $rootScope.addStylesheet = function(stylesheet){
                $rootScope.stylesheets.push(stylesheet);
            };

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