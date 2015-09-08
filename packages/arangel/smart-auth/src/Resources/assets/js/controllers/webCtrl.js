(function(){
    'use strict';

    angular.module('auth')
        .controller('WebCtrl', function($rootScope, $state, $stateParams, $scope, $log, $auth, ProfileService, alertService){
            /*$rootScope.stylesheets = [
                {href: 'themes/'+$rootScope.config.activeTheme+'assets/css/auth.css', type: 'text/css'}
            ];*/

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            $scope.isAdmin = function(){
                return $scope.userProfile.user ? $scope.userProfile.user.isAdmin : false;
            };

            /**
             * Get user's profile information.
             */
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

            if($scope.isAuthenticated()) $scope.getUser();


        });
})();