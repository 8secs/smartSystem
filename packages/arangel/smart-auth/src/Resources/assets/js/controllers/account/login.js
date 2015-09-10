(function (){
    'use strict';

    angular.module('auth')
        .controller('LoginCtrl', function($scope, $state, $stateParams, alertService, $auth, Account, $log) {

            $scope.alerts = alertService.get();

            $scope.login = function() {
                $auth.login({ email: $scope.email, password: $scope.password })
                    .then(function() {
                        alertService.add('success', 'You have successfully logged in');
                        //$scope.getUser();
                        $state.transitionTo('home', $stateParams, {reload: true});

                    })
                    .catch(function(response) {
                        if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                        else  alertService.add('danger', response.data ? response.data.message : response);

                    });
            };
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider)
                    .then(function() {
                        alertService.add('success', 'You have successfully logged in');
                    })
                    .catch(function(response) {
                        alertService.add('danger', response.data ? response.data.message : response);
                    });
            };

            $scope.password = function() {
                Account.password({
                    email: $scope.email
                })
                .then(function() {
                        alertService.add('success', 'Reset your password');
                })
                .catch(function(response) {
                    if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                    else  alertService.add('danger', response.data ? response.data.message : response);

                });

            };

            $scope.resetPassword = function() {
                Account.reset({
                    email: $scope.email,
                    password: $scope.password,
                    password_confirmation: $scope.confirmPassword,
                    token: $scope.token
                })
                .then(function() {
                        alertService.add('success', 'Reset your password');
                })
                .catch(function(response) {
                        $log.log(response);
                        if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                        else  alertService.add('danger', response.data ? response.data.message : response);

                });

            };

            if($stateParams.token) $scope.token = $stateParams.token;

        });

})();