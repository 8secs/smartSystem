(function (){
    'use strict';

    angular.module('auth')
        .controller('LogoutCtrl', function($auth, $state, alertService) {
            if (!$auth.isAuthenticated()) {
                return;
            }
            $auth.logout()
                .then(function() {
                    $state.go('home');
                    alertService.add('success', "log out.");
                });
        });

})();