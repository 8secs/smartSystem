(function(){
    'use strict';

    angular.module('Admin')
        .controller('DashboardCtrl', function($scope, Account, $state, alertService, ProfileService){

            $scope.alerts = alertService.get();

            $scope.addFriend = function(id){
                var promise = ProfileService.addFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFriend = function(id){
                var promise = ProfileService.removeFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };


            $scope.addFollowee = function(id){
                var promise = ProfileService.addFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFollowee = function(id){
                var promise = ProfileService.removeFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

        });

})();