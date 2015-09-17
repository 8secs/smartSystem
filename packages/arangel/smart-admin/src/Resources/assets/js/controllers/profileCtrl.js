(function (){
    'use strict';

    adminModule
        .controller('ProfileCtrl', function($scope,
                                            $rootScope,
                                            $state, 
                                            $auth, 
                                            AdminProfile, 
                                            alertService, $log) {

            //$log.currentLevel = $log.LEVELS.debug;

            $scope.image = null;
            $scope.alerts = alertService.get();

            $scope.address = null;
            $scope.userLocation = null;


            $scope.panes = [
                {title: "Settings", content: "themes/"+$rootScope.config.activeTheme+"/partials/profile/settings.html", active:true},
                {title: "Timeline", content: "themes/"+$rootScope.config.activeTheme+"/partials/profile/timeline.html"},
                {title: "Activity", content: "themes/"+$rootScope.config.activeTheme+"/partials/profile/activity.html"},
                {title: "Acounts", content: "themes/"+$rootScope.config.activeTheme+"/partials/profile/accounts.html"}
            ];

            /**
             * Update user's profile information.
             */
            $scope.updateUser = function(data) {
                $scope.image = $('#img').attr('ng-src');

                AdminProfile.updateUser({
                    displayName: $scope.userProfile.user.displayName,
                    email: $scope.userProfile.user.email,
                    file: $scope.image
                });

            };

            $scope.storeProfile = function(data){
                AdminProfile.storeProfile(data);
            };

            $scope.updateProfile = function(data){
                AdminProfile.updateProfile(data);
            };

            $scope.storeLocation = function(data){
                var promise = AdminProfile.storeLocation(data);
                promise.then(function(data){
                    $log.log(data);
                });
            };

            $scope.editLocation = function(data){

                var editLocation = {
                    Id : data.id,
                    Street: data.address,
                    City: data.city,
                    Country: data.country,
                    PostCode: data.postCode,
                    FormattedAddress: data.formattedAddress,
                    Latitude: data.latitude,
                    Longitude: data.longitude
                };
                $scope.address = editLocation;

            };

            $scope.updateLocation = function(data){
                var promise = AdminProfile.updateLocation(data);
                promise.then(function(data){
                    $log.log(data);
                });
            };

            /**
             * Link third-party provider.
             */
            $scope.link = function(provider) {
                $auth.link(provider)
                    .then(function() {
                        alertService.add('success', 'You have successfully linked ' + provider + ' account');
                    })
                    .then(function() {
                        $scope.getUser();
                    })
                    .catch(function(response) {
                        alertService.add('success', response.data.message);
                    });
            };

            /**
             * Unlink third-party provider.
             */
            $scope.unlink = function(provider) {
                $auth.unlink(provider)
                    .then(function() {
                        alertService.add('success', 'You have successfully unlinked ' + provider + ' account');
                    })
                    .then(function() {
                        $scope.getUser();
                    })
                    .catch(function(response) {
                        alertService.add(response.data ? response.data.message : 'Could not unlink ' + provider + ' account');
                    });
            };
        });

})();