(function(){
    'use strict';

    adminModule.controller('adminCtrl', function($rootScope,
                                          $scope,
                                          $auth,
                                          AdminProfile,
                                          alertService,
                                          uiGmapGoogleMapApi,
                                          $modal,
                                          $log)
        {
            $rootScope.stylesheets = [
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/styles.css', type: 'text/css'},
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/admin.css', type: 'text/css'},
                {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/dropzone.css', type: 'text/css'}
            ];

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            $scope.isAdmin = function(){
                return $scope.userProfile.user ? $scope.userProfile.user.isAdmin : false;
            };

            $scope.getUserLocationByIp = function(){
                var promise = AdminProfile.getUserLocationByIp();
                promise.then(function(data){
                    //alertService.add("success", "Tenemos localizacion");
                    $scope.loc = data.loc;
                    $scope.httpLocation = data;

                    $scope.map = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                    $scope.userMap = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                });
            };

            /**
             * Get user's profile information.
             */
            $scope.getUser = function() {

                var promise = AdminProfile.getUser();
                promise.then(
                    function(data){
                        $scope.userProfile = data;
                    },
                    function(error){
                        alertService.add('error', error);
                    });
            };

            $scope.getFriends = function(){
                var promise = AdminProfile.getFriends();
                promise.then(function(data){

                    if(typeof data.friends !== 'undefined') $scope.num_friends = data.friends.length;
                    else $scope.num_friends = 0;
                    $scope.friends = data.friends;
                    $scope.not_friends = data.not_friends;
                });
            };

            $scope.getFollowers = function(){
                var promise = AdminProfile.getFollowers();
                promise.then(function(data){
                    $scope.followers = data.followers;
                    if(typeof data.followers !== 'undefined') $scope.num_followers = data.followers.length;
                    else $scope.num_followers = 0;
                });
            };

            $scope.getFollowees = function(){
                var promise = AdminProfile.getFollowees();
                promise.then(function(data){
                    $scope.followees = data.followees;
                    $scope.users = data.users;
                    if(typeof data.followees !== 'undefined') $scope.num_followees = data.followees.length;
                    else $scope.num_followees = 0;
                });
            };

            $scope.showModal = function(model, id){
                var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
                $scope.title = "Delete " + model;
                $scope.content = "Are you sure that you want to delete this " + model + "?";
                $scope.model = model;
                $scope.id = id;
                modal.$promise.then(modal.show);
            };



            /**
             * SETUP Google Maps
             * @type {{center: {latitude: number, longitude: number}, zoom: number}}
             **/



             $scope.location = null;

             uiGmapGoogleMapApi.then(function(maps) {
                            $scope.googleVersion = maps.version;
                            maps.visualRefresh = true;
                            $log.info('$scope.map.rectangle.bounds set');

                        });

             $scope.init = function(){
                            $scope.getUserLocationByIp();
                            $scope.getUser();
                            $scope.getFriends();
                            $scope.getFollowers();
                            $scope.getFollowees();

                        };

             $scope.init();
        });

})();
