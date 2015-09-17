(function(){
    'use strict';

        adminModule.controller('dashboardCtrl', function($scope,
                                              AdminAccount,
                                              $state,
                                              alertService,
                                              AdminProfile){

            $scope.alerts = alertService.get();

            $scope.addFriend = function(id){
                var promise = AdminProfile.addFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFriend = function(id){
                var promise = AdminProfile.removeFriend(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };


            $scope.addFollowee = function(id){
                var promise = AdminProfile.addFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

            $scope.removeFollowee = function(id){
                var promise = AdminProfile.removeFollowee(id);
                promise.then(function(data){
                    $state.transitionTo($state.current, null, { reload: true, inherit: false, notify: true });
                });
            };

        });

})();