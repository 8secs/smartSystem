(function (){
    'use strict';

    angular.module('auth')
        .controller('SignupCtrl',  function($scope, alertService, $auth) {

            $scope.alerts = alertService.get();

            $scope.signup = function() {
                $auth.signup({
                    displayName: $scope.displayName,
                    email: $scope.email,
                    password: $scope.password
                }).catch(function(response) {
                    if (typeof response.data.message === 'object') {
                        angular.forEach(response.data.message, function(message) {
                            alertService.add('danger', message[0]);
                        });
                        /**
                         * Update user
                         */
                        $scope.getUser();

                    } else {
                        alertService.add('danger', response.data.message);
                    }
                });
            };
        });

})();