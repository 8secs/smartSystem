(function () {
    'use strict';

    angular.module('adminsys', [
            'ngResource',
            'ngTable',
            'ui.multiselect',
        ])
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $stateProvider


                .state('users', {
                    url: '/users',
                    templateUrl: 'themes/bootstrap/partials/admin/users.html',
                    controller: 'UserCtrl',
                    parent: 'admin'
                })
                .state('edit-user', {
                    url: '/edit-user/:userID/:editUser',
                    templateUrl: 'themes/bootstrap/partials/profile/profile.html',
                    controller: 'UserCtrl',
                    parent: 'admin'

                })
                .state('roles', {
                    url: '/roles',
                    templateUrl: 'themes/bootstrap/partials/admin/roles.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('new-role', {
                    url: '/new-role',
                    templateUrl: 'themes/bootstrap/partials/admin/role.html',
                    parent: 'admin'
                })
                .state('edit-role', {
                    url: '/edit-role/:roleID/:editRole',
                    templateUrl: 'themes/bootstrap/partials/admin/role.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('new-permission', {
                    url: '/new-permission',
                    templateUrl: 'themes/bootstrap/partials/admin/permission.html',
                    parent: 'admin'
                })
                .state('edit-permission', {
                    url: '/edit-permission/:permID/:editPerm',
                    templateUrl: 'themes/bootstrap/partials/admin/permission.html',
                    controller: 'RoleCtrl',
                    parent: 'admin'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'themes/bootstrap/partials/profile/profile.html',
                    controller: 'ProfileCtrl',
                    parent: 'admin'
                });

            $urlRouterProvider.otherwise('/dashboard');
            console.log("admmin");

        });

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .controller('adminCtrl', function($rootScope,
                                          $scope,
                                          $auth,
                                          ProfileService,
                                          alertService,
                                          uiGmapGoogleMapApi,
                                          $modal,
                                          $log)
        {
            var stylesheets = {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/admin.css', type: 'text/css'};
            $rootScope.addStylesheet(stylesheets);

            $scope.getUserLocationByIp = function(){
                var promise = ProfileService.getUserLocationByIp();
                promise.then(function(data){
                    //alertService.add("success", "Tenemos localizacion");
                    $scope.loc = data.loc;
                    $scope.httpLocation = data;

                    $scope.map = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                    $scope.userMap = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                });
            };

            $scope.getFriends = function(){
                var promise = ProfileService.getFriends();
                promise.then(function(data){

                    if(typeof data.friends !== 'undefined') $scope.num_friends = data.friends.length;
                    else $scope.num_friends = 0;
                    $scope.friends = data.friends;
                    $scope.not_friends = data.not_friends;
                });
            };

            $scope.getFollowers = function(){
                var promise = ProfileService.getFollowers();
                promise.then(function(data){
                    $scope.followers = data.followers;
                    if(typeof data.followers !== 'undefined') $scope.num_followers = data.followers.length;
                    else $scope.num_followers = 0;
                });
            };

            $scope.getFollowees = function(){
                var promise = ProfileService.getFollowees();
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
                            $log.log("initAdmin");
                            $scope.getUserLocationByIp();
                            //$scope.getUser();
                            $scope.getFriends();
                            $scope.getFollowers();
                            $scope.getFollowees();

                        };

             $scope.init();



        });

})();
/*
(function(){
    'use strict';

    angular.module('Admin')
        .controller('adminCtrl', function($scope,
                                          $auth,
                                          ProfileService,
                                          alertService,
                                          uiGmapGoogleMapApi,
                                          $modal,
                                          $log)
        {

            $scope.getUserLocationByIp = function(){
                var promise = ProfileService.getUserLocationByIp();
                promise.then(function(data){
                    //alertService.add("success", "Tenemos localizacion");
                    $scope.loc = data.loc;
                    $scope.httpLocation = data;

                    $scope.map = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                    $scope.userMap = { center: { latitude: $scope.loc[0], longitude: $scope.loc[1] }, zoom: 8 };
                });
            };

            $scope.getFriends = function(){
                var promise = ProfileService.getFriends();
                promise.then(function(data){

                    if(typeof data.friends !== 'undefined') $scope.num_friends = data.friends.length;
                    else $scope.num_friends = 0;
                    $scope.friends = data.friends;
                    $scope.not_friends = data.not_friends;
                });
            };

            $scope.getFollowers = function(){
                var promise = ProfileService.getFollowers();
                promise.then(function(data){
                    $scope.followers = data.followers;
                    if(typeof data.followers !== 'undefined') $scope.num_followers = data.followers.length;
                    else $scope.num_followers = 0;
                });
            };

            $scope.getFollowees = function(){
                var promise = ProfileService.getFollowees();
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



            $scope.location = null;

            uiGmapGoogleMapApi.then(function(maps) {
                $scope.googleVersion = maps.version;
                maps.visualRefresh = true;
                $log.info('$scope.map.rectangle.bounds set');

            });

            $scope.init = function(){
                $log.log("initAdmin");
                $scope.getUserLocationByIp();
                //$scope.getUser();
                $scope.getFriends();
                $scope.getFollowers();
                $scope.getFollowees();

            };

            $scope.init();

        });

})();*/
(function(){
    'use strict';

    angular.module('adminsys')
        .controller('dashboardCtrl', function($scope,
                                              Account,
                                              $state,
                                              alertService,
                                              ProfileService){

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
/**
 * Created by andres on 9/08/15.
 */
(function () {
    'use strict';

    angular.module('adminsys')
        .controller('RoleCtrl', function ($scope, alertService, $state, $stateParams, Role, ngTableParams){

            $scope.alerts = alertService.get();

            /**
             * Get roles list information.
             */
            $scope.getRoles = function() {
                Role.getRoles()
                    .success(function(data) {
                        $scope.roles = data.roles;
                        $scope.permissions = data.permissions;

                        $scope.tableParams = new ngTableParams({
                            page: 1,            // show first page
                            count: 10        // count per page
                        }, {
                            total: $scope.roles.length, // length of data
                            getData: function ($defer, params) {
                                $defer.resolve($scope.roles.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })

                        $scope.tablePermissionParams = new ngTableParams({
                            page: 1,            // show first page
                            count: 10        // count per page
                        }, {
                            total: $scope.permissions.length, // length of data
                            getData: function ($defer, params) {
                                $defer.resolve($scope.permissions.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        })

                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    });
            };

            /**
             * Get Role data
             */
            $scope.getRole = function(id){
                $scope.roleID = id;
                $scope.editRole = true;
                Role.getRole(id)
                    .success(function(data){
                        $scope.role = data.role;
                        $scope.permissions = data.permissions;
                        $scope.role.permissions = data.role.permissions;

                        $scope.permissionSearchSettings = {enableSearch: true};
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "User received");
                    });
            }

            /**
             * Create a role.
             */
            $scope.storeRole = function(data) {
                Role.storeRole({
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been updated");
                    });
            };

            $scope.updateRole = function(data){
                Role.updateRole({
                    id: data.id,
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description,
                    permissions: data.permissions
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function(){
                        alertService.add('success', "Data has been updated");
                    });

            };

            $scope.deleteRole = function(id){

                Role.deleteRole(id)
                    .success(function(data){
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been deleted");
                    })
            };

            $scope.submitRole = function(data){

                if(typeof $scope.editRole === 'undefined'){
                    $scope.storeRole(data);
                }else{
                    $scope.updateRole(data);
                }
            };

            /**
             * Get Permission data
             */
            $scope.getPermission = function(id){
                $scope.permID = id;
                $scope.editPerm = true;
                Role.getPermission(id)
                    .success(function(data){
                        $scope.permission = data.permission;
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Permission has been received");
                    });
            }

            /**
             * Create a permission.
             */
            $scope.storePermission = function(data) {
                console.log("storePermission");
                Role.storePermission({
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been created.");
                    });
            };

            /**
             * Update a permission.
             */
            $scope.updatePermission = function(data) {
                Role.updatePermission({
                    id: data.id,
                    name: data.name,
                    display_name: data.display_name,
                    description: data.description
                })
                    .success(function(data){
                        $state.go('roles');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been created.");
                    });
            };

            /**
             * Delete permission.
             */
            $scope.deletePermission = function(id){

                Role.deletePermission(id)
                    .success(function(data){
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been deleted.");
                    })
            };

            /**
             * Send form to appropiate method
             * @param data FormData
             */
            $scope.submitPermission = function(data){
                console.log("submit Permission " + $scope.editPerm);
                if(typeof $scope.editPerm !== 'undefined'){
                    $scope.updatePermission(data);
                }else{
                    $scope.storePermission(data);
                }
            };

            /*$scope.showModal = function(model, id){
             var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
             $scope.title = "Delete " + model;
             $scope.content = "Are you sure that you want to delete this " + model + "?";
             $scope.model = model;
             $scope.id = id;
             modal.$promise.then(modal.show);
             };*/

            $scope.deleteModel = function(model, id){
                if(model == 'role') $scope.deleteRole(id);
                else $scope.deletePermission(id);
            };


            /**
             * Load models depending of the State
             */
            if($stateParams.editRole){
                $scope.getRole($stateParams.roleID);
            }else if($stateParams.editPerm){
                $scope.getPermission($stateParams.permID)
            }else{
                $scope.getRoles();
            }
        })

})();

/**
 * Created by andres on 10/08/15.
 */
(function () {
    'use strict';

    angular.module('adminsys')
        .controller('UserCtrl', function ($scope, $state, $stateParams, alertService, $modal, User, $filter, ngTableParams){

            $scope.panes = [
                {title: "Settings", content: "partials/account/profile/settings.html", active:true}
            ];

            $scope.alerts = alertService.get();

            /**
             * Get users list information.
             */
            $scope.getUsers = function() {
                User.getUsers()
                    .success(function(data) {
                        $scope.users = data.users;

                        $scope.tableParams = new ngTableParams({
                            page: 1,
                            count: 10,
                            sorting: {
                                displayName: 'asc'
                            },
                            filter: {
                                displayName: ''
                            }
                        }, {
                            total: $scope.users.length,
                            getData: function ($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting ? $filter('orderBy')(data.users, params.orderBy()) : data.users;
                                orderedData = params.filter ? $filter('filter')(orderedData, params.filter()) : orderedData;
                                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                params.total(orderedData.length);
                                $defer.resolve($scope.users);
                            }
                        })

                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been received.");
                    });
            };
            /**
             * Get user data
             */
            $scope.getUser = function(id){
                $scope.userID = id;
                $scope.editUser = true;
                User.getUser(id)
                    .success(function(data){
                        $scope.user = data.user;
                        $scope.image = 'uploads/'+data.user.image;
                        $scope.roles = data.roles;
                        $scope.user.roles = data.user.roles;

                        $scope.roleSearchSettings = {enableSearch: true};
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been received.");
                    });
            }

            $scope.updateUser = function(data){
                $scope.image = $('#img').attr('ng-src');
                User.updateUser({
                    id: data.id,
                    displayName: data.displayName,
                    email: data.email,
                    file: $scope.image,
                    roles: data.roles
                })
                    .success(function(data){
                        $state.go('users');
                    })
                    .error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('success', "Data has been updated.");
                    })
            }

            $scope.deleteUser = function(id){

                User.deleteUser(id)
                    .success(function(data){
                        console.log(data);
                        $state.reload();
                    }).error(function(error) {
                        alertService.add('error', error.message);
                    })
                    .then(function() {
                        alertService.add('error', "Data has been deleted.");
                    })
            }

            $scope.showModal = function(model, id){
                var modal = $modal({scope: $scope, templateUrl: 'partials/components/modal-delete.tpl.html', show: true});
                $scope.title = "Delete " + model;
                $scope.content = "Are you sure that you want to delete this " + model + "?";
                $scope.model = model;
                $scope.id = id;
                modal.$promise.then(modal.show);
            };

            $scope.delete = function(model, id){
                $scope.deleteUser(id);
            };

            if($stateParams.editUser){
                $scope.getUser($stateParams.userID);
            }else{
                $scope.getUsers();
            }

        })

})();

(function (){
    'use strict';

    angular.module('adminsys')
        .directive('ngThumb', ['$window', function($window) {
            var helper = {
                support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            return {
                restrict: 'A',
                template: '<canvas/>',
                link: function(scope, element, attributes) {
                    if (!helper.support) return;

                    var params = scope.$eval(attributes.ngThumb);

                    if (!helper.isFile(params.file)) return;
                    if (!helper.isImage(params.file)) return;

                    var canvas = element.find('canvas');
                    var reader = new FileReader();

                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile(event) {
                        var img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage() {
                        var width = params.width || this.width / this.height * params.height;
                        var height = params.height || this.height / this.width * params.width;
                        canvas.attr({ width: width, height: height });
                        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }]);

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('googlePlaces', function(){
            var componentForm = {
                premise: 'long_name',
                street_number: 'short_name',
                route: 'long_name',
                sublocality_level_1: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };
            var mapping = {
                premise: 'BuildingName',
                street_number: 'Unit',
                route: 'Street',
                sublocality_level_1: 'Suburb',
                locality: 'City',
                administrative_area_level_1: 'State',
                country: 'Country',
                postal_code: 'PostCode'
                //Region, District, Level
            };

            return {
                require: 'ngModel',
                restrict: 'E',
                replace: true,
                // transclude:true,
                scope: {
                    ngModel: '=',
                    address: '=?'
                },
                template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level" autocomplete="false"/>',
                link: function(scope, element, attrs, model) {

                    var options = {
                        // componentRestrictions: { country: 'nz' },
                        types: ['geocode']
                    };

                    var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], options);

                    element.bind("keydown keypress", function(event){
                        if(event.which === 13) {
                            scope.$apply(function (){

                                scope.$eval(attrs.ngEnter);
                            });

                            event.preventDefault();
                        }
                    });

                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        var place = autocomplete.getPlace();
                        var location = place.geometry && place.geometry.location ? {
                            Latitude: place.geometry.location.lat(),
                            Longitude: place.geometry.location.lng()
                        } : {};

                        // Get each component of the address from the place location
                        // and fill the corresponding field on the form.
                        for (var i = 0; i < place.address_components.length; i++) {
                            var addressType = place.address_components[i].types[0];
                            if (componentForm[addressType]) {
                                var val = place.address_components[i][componentForm[addressType]];
                                location[mapping[addressType]] = val;
                            }
                        }
                        location.FormattedAddress = place.formatted_address;
                        location.PlaceId = place.place_id;

                        scope.$apply(function () {

                            scope.address = location; // array containing each location component
                            model.$setViewValue(location);
                            element.val(location[attrs.value]);
                        });
                    });
                }
            };
        });
})();
/**
 * Created by andres on 6/08/15.
 */

(function () {
    'use strict';

    angular.module('adminsys')
        .factory('Account', function($http) {
            return {
                getIpInfo: function(){
                    return $http.get('http://ipinfo.io/json');
                },
                getUser: function() {
                    var url = "/api/me";
                    return $http.get(url);
                },
                updateUser: function(profileData) {
                    return $http.put('/api/me', profileData);
                },
                uploadImage: function(profileDate){
                    return $http.post('/api/me/image', profileDate);
                },
                storeProfile: function(profileDate){
                    return $http.post('/api/me/store-profile', profileDate);
                },
                updateProfile: function(profileDate){
                    return $http.post('/api/me/update-profile', profileDate);
                },
                password: function(data){
                    return $http.post('/auth/password/email', data);
                },
                reset: function(data){
                    return $http.post('/auth/password/reset', data);
                },
                getFriends: function(){
                    return $http.get('/api/me/friends');
                },
                addFriend: function(id){
                    return $http.post('/api/me/add-friend', {'id':id});
                },
                removeFriend: function(id){
                    return $http.post('/api/me/remove-friend', {'id':id});
                },
                getFollowers: function(){
                    return $http.get('/api/me/followers');
                },
                addFollower: function(id){
                    return $http.post('/api/me/add-follower', {'id':id});
                },
                removeFollower: function(id){
                    return $http.post('/api/me/remove-follower', {'id':id});
                },
                getFollowees: function(){
                    return $http.get('/api/me/following');
                },
                addFollowee: function(id){
                    return $http.post('/api/me/add-followee', {'id':id});
                },
                removeFollowee: function(id){
                    return $http.post('/api/me/remove-followee', {'id':id});
                },
                storeLocation: function(data){
                    return $http.post('/api/me/store-location', data);
                },
                updateLocation: function(data){
                    return $http.post('/api/me/update-location', data);
                }
            };
        });

})();

(function(){
    'use strict';

    angular.module('adminsys')
        .service('ProfileService', function(Account, $q, $log, alertService){

            return {
                getUserLocationByIp: function(){
                    var deferred = $q.defer();
                    Account.getIpInfo()
                        .then(function(response){
                            var ip = response.data.ip;
                            var hostname = response.data.hostname;
                            var location = response.data.loc;
                            var loc = location.split(",");
                            var city = response.data.city;
                            var country = response.data.country;
                            $log.log(loc);
                            deferred.resolve({
                                ip: ip,
                                hostname: hostname,
                                loc: loc,
                                city: city,
                                country: country
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error from Server code: " + response.status);
                        });
                    return deferred.promise;
                }/*,
                getUser: function(){
                    var deferred = $q.defer();
                    Account.getUser()
                        .then(
                        function(response){
                            var data = response.data;

                            deferred.resolve({
                                user: data.user,
                                image: 'uploads/'+data.user.image,
                                roles: data.roles,
                                user_roles: data.user.roles,
                                about: data.user.profile
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }*/,
                updateUser: function(data){
                    var deferred = $q.defer();
                    Account.updateUser(data)
                        .then(function(response){
                            alertService.add('success', 'User updated.');

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });

                    return deferred.promise;

                },
                storeProfile: function(data){
                    var deferred = $q.defer();
                    Account.storeProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateProfile: function(data){
                    var deferred = $q.defer();
                    Account.updateProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFriends: function(){
                    var deferred = $q.defer();
                    Account.getFriends()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                not_friends: data.not_friends,
                                friends: data.friends
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowees: function(){
                    var deferred = $q.defer();
                    Account.getFollowees()
                        .then(function(response){
                            var data = response.data;
                            var users = data.users;
                            var followees = data.followees;
                            angular.forEach(users, function(user){
                                angular.forEach(followees, function(followee){
                                    //console.log("f= " + followee.id + " u= " + user.id);
                                    if(followee.id == user.id) user.isFollowing = true;
                                });
                            });

                            deferred.resolve({
                                users: users,
                                followees: followees
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowers: function(){
                    var deferred = $q.defer();
                    Account.getFollowers()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                followers: data.followers
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFriend: function(id){
                    var deferred = $q.defer();
                    Account.addFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFriend: function(id){
                    var deferred = $q.defer();
                    Account.removeFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFollowee: function(id){
                    var deferred = $q.defer();
                    Account.addFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFollowee: function(id){
                    var deferred = $q.defer();
                    Account.removeFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                storeLocation: function(data){
                    var deferred = $q.defer();
                    Account.storeLocation(data)
                        .then(function(response){
                            deferred.resolve({
                                address: response.data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateLocation: function(data){
                    var deferred = $q.defer();
                    Account.updateLocation(data)
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                data: data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }


            };
        });

})();
/**
 * Created by andres on 9/08/15.
 */
(function () {
    'use strict';

    angular.module('adminsys')
        .factory('Role', function($http){
            return {
                getRoles: function() {
                    var url = "/api/dashboard/roles";
                    return $http.get(url);
                },
                getRole: function(id){
                    return $http.get('/api/dashboard/role/'+id);
                },
                storeRole: function(data) {
                    return $http.post('/api/dashboard/roles/store-role', data);
                },
                updateRole: function(data){
                    return $http.post('/api/dashboard/roles/update-role', data);
                },
                deleteRole: function(id){
                    return $http.post('/api/dashboard/roles/destroy-role', {id: id});
                },
                getPermission: function(id){
                    return $http.get('/api/dashboard/perm/'+id);
                },
                storePermission: function(data) {
                    return $http.post('/api/dashboard/perm/store-permission', data);
                },
                updatePermission: function(data){
                    return $http.post('/api/dashboard/perm/update-permission', data);
                },
                deletePermission: function(id){
                    return $http.post('/api/dashboard/perm/destroy-permission', {id: id});
                }
            };
        })

})();

/**
 * Created by andres on 10/08/15.
 */
(function (){
    'use strict';

    angular.module('adminsys')
        .factory('User', function($http){

            return {
                getUsers: function(){
                    return $http.get('api/dashboard/users');
                },
                getUser: function(id){
                    return $http.get('api/dashboard/user/'+id);
                },
                updateUser: function(data){
                    return $http.post('api/dashboard/user/update-user', data);
                },
                deleteUser: function(id){
                    return $http.post('api/dashboard/user/destroy-user', {id: id});
                }
            };

        })

})();

(function () {
    'use strict';

    angular
        .module('adminsys', [])
        .directive('adminLteLayout', adminLteLayoutDirective)
        .directive('adminLteTree', adminLteTreeDirective)
        .directive('adminLteSidebarToggle', adminLteSidebarToggleDirective)
        .directive('adminLteSidebarToggleSwipe', adminLteSidebarToggleSwipeDirective)
        .directive('adminLteBoxWidget', adminLteBoxWidgetDirective);

    function adminLteLayoutDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            fix();
            fixSidebar();

            $(window, ".wrapper").resize(function () {
                fix();
                fixSidebar();
            });

            function fix() {
                var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                var window_height = $(window).height();
                var sidebar_height = $('.sidebar').height();
                //Set the min-height of the content and sidebar based on the
                //the height of the document.
                if ($('body').hasClass('fixed')) {
                    $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                } else {
                    if (window_height >= sidebar_height) {
                        $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                    } else {
                        $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                    }
                }
            }

            function fixSidebar() {
                if (!$("body").hasClass("fixed")) {
                    if (typeof $.fn.slimScroll != 'undefined') {
                        $(".sidebar").slimScroll({destroy: true}).height("auto");
                    }
                    return;
                } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                    console.error("Error: the fixed layout requires the slimscroll plugin!");
                }
                //Enable slimscroll for fixed layout
                if (typeof $.fn.slimScroll != 'undefined') {
                    //Distroy if it exists
                    $(".sidebar").slimScroll({destroy: true}).height("auto");
                    //Add slimscroll
                    $(".sidebar").slimscroll({
                        height: ($(window).height() - $(".main-header").height()) + "px",
                        color: "rgba(0,0,0,0.2)",
                        size: "3px"
                    });
                }
            }
        }
    }

    function adminLteTreeDirective() {
        return {
            restrict: '',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $("li a", $($element)).click(function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp('normal', function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp('normal');
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown('normal', function () {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                        var window_height = $(window).height();
                        var sidebar_height = $('.sidebar').height();
                        //Set the min-height of the content and sidebar based on the
                        //the height of the document.
                        if ($('body').hasClass('fixed')) {
                            $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                        } else {
                            if (window_height >= sidebar_height) {
                                $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                            } else {
                                $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                            }
                        }
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        }
    }

    function adminLteSidebarToggleDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {
            //Get the screen sizes
            var screenSizes = {
                xs: 480,
                sm: 768,
                md: 992,
                lg: 1200
            };

            //Enable sidebar toggle
            $($element).click(function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                    $("body").toggleClass('sidebar-collapse');
                }
                //Handle sidebar push menu for small screens
                else {
                    if ($("body").hasClass('sidebar-open')) {
                        $("body").removeClass('sidebar-open');
                        $("body").removeClass('sidebar-collapse')
                    } else {
                        $("body").addClass('sidebar-open');
                    }
                }
            });
            //
            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                    $("body").removeClass('sidebar-open');
                }
            });
        }
    }

    function adminLteSidebarToggleSwipeDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {
            var _this = {};
            _this.contentSwipeArea = $('.content-swipe-area');
            _this.body = $("body");
            _this.sidebar = $($element);
            _this.navbrand = $('.navbar-brand');
            _this.sidebartoggle = $('.sidebar-toggle');
            setTimeout(setHeight, 0);
            $(window).on('resize', setHeight);
            _this.contentSwipeArea.on("swiperight", openSidebar);
            _this.contentSwipeArea.on("swipeleft", closeSidebar);
            _this.sidebar.on("swipeleft", closeSidebar);
            _this.navbrand.on('click', toggleSidebar);
            _this.navbrand.on("swiperight", openSidebar);
            _this.navbrand.on("swipeleft", closeSidebar);
            _this.sidebartoggle.on("swiperight", openSidebar);
            _this.sidebartoggle.on("swipeleft", closeSidebar);
            function setHeight() {
                _this.contentSwipeArea.css('height', _this.contentSwipeArea.parent().height());
            }

            function openSidebar() {
                _this.body.stop().removeClass("sidebar-collapse");
            }

            function closeSidebar() {
                _this.body.stop().addClass("sidebar-collapse");
            }

            function toggleSidebar() {
                _this.body.toggleClass("sidebar-collapse");
            }
        }
    }

    function adminLteBoxWidgetDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $($element).find('[data-widget="collapse"]').click(function (e) {
                e.preventDefault();
                collapse();
            });

            $($element).find('[data-widget="remove"]').click(function (e) {
                e.preventDefault();
                remove();
            });

            function collapse() {
                //Find the box parent
                var box = $($element);
                //Find the body and the footer
                var bf = box.find(".box-body, .box-footer");
                if (!box.hasClass("collapsed-box")) {
                    //Convert minus into plus
                    $($element).find('[data-widget="collapse"]').children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                    bf.slideUp(300, function () {
                        box.addClass("collapsed-box");
                    });
                } else {
                    //Convert plus into minus
                    $($element).find('[data-widget="collapse"]').children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                    bf.slideDown(300, function () {
                        box.removeClass("collapsed-box");
                    });
                }
            }

            function remove() {
                //Find the box parent
                $($element).slideUp();
            }
        }
    }

})();
(function() {
    'use strict';

    angular.module('adminsys')
        .controller('layoutCtrl', function($scope, $rootScope){
            $scope.title = 'default title';
            $scope.subtitle = 'default subtitle';

            $rootScope.stylesheets = [
                {href: 'css/admin/app.css', type: 'text/css'},
                {href: 'css/admin/admin.css', type: 'text/css'}
            ];
        });
})();
(function() {

    'use strict';

    angular.module('adminsys')
        .controller('SidebarMenuCtrl', function($scope, sidebarMenuService, $auth, alertService, Account){

            $scope.alerts = alertService.get();

            sidebarMenuService.getSidebar()
                .success(function(data, status, headers, config){
                    data = data || {};
                    $scope.menus = data.sidebar || [];
                });
        });

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteBoxWidget', function(){
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {

                $($element).find('[data-widget="collapse"]').click(function (e) {
                    e.preventDefault();
                    collapse();
                });

                $($element).find('[data-widget="remove"]').click(function (e) {
                    e.preventDefault();
                    remove();
                });

                function collapse() {
                    //Find the box parent
                    var box = $($element);
                    //Find the body and the footer
                    var bf = box.find(".box-body, .box-footer");
                    if (!box.hasClass("collapsed-box")) {
                        //Convert minus into plus
                        $($element).find('[data-widget="collapse"]').children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                        bf.slideUp(300, function () {
                            box.addClass("collapsed-box");
                        });
                    } else {
                        //Convert plus into minus
                        $($element).find('[data-widget="collapse"]').children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                        bf.slideDown(300, function () {
                            box.removeClass("collapsed-box");
                        });
                    }
                }

                function remove() {
                    //Find the box parent
                    $($element).slideUp();
                }
            }
        });

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteControlSidebar', function(){
            console.log("adminLteControlSidebar");
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.control-sidebar-toggle');


                _this.navbrand.on('click', toggleSidebar);
                _this.sidebartoggle.on("click", toggleSidebar);


                function toggleSidebar() {
                    //If the sidebar is not open
                    if (!_this.sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                        //Open the sidebar
                        open(_this.sidebar, true);
                    } else {
                        close(_this.sidebar, true);
                    }
                }

                //If the body has a boxed layout, fix the sidebar bg position
                _this.bg = $(".control-sidebar-bg");
                fix(_this.bg);

                //If the body has a fixed layout, make the control sidebar fixed
                if ($('body').hasClass('fixed')) {
                    fixForFixed(_this.sidebar);
                } else {
                    //If the content height is less than the sidebar's height, force max height
                    if ($('.content-wrapper, .right-side').height() < _this.sidebar.height()) {
                        fixForContent(_this.sidebar);
                    }
                }

                function open (sidebar, slide) {
                    //Slide over content
                    if (slide) {
                        sidebar.addClass('control-sidebar-open');
                    } else {
                        //Push the content by adding the open class to the body instead
                        //of the sidebar itself
                        $('body').addClass('control-sidebar-open');
                    }

                }

                function close  (sidebar, slide) {
                    if (slide) {
                        sidebar.removeClass('control-sidebar-open');
                    } else {
                        $('body').removeClass('control-sidebar-open');
                    }
                }

                function fix (sidebar) {
                    var _this = this;
                    if ($("body").hasClass('layout-boxed')) {
                        sidebar.css('position', 'absolute');
                        sidebar.height($(".wrapper").height());
                        $(window).resize(function () {
                            fix(sidebar);
                        });
                    } else {
                        sidebar.css({
                            'position': 'fixed',
                            'height': 'auto'
                        });
                    }

                }

                function fixForFixed(sidebar) {
                    sidebar.css({
                        'position': 'fixed',
                        'max-height': '100%',
                        'overflow': 'auto',
                        'padding-bottom': '50px'
                    });
                }

                function fixForContent(sidebar){
                    $(".content-wrapper, .right-side").css('min-height', sidebar.height());
                }
            }

        });

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteLayout', function(){
            console.log("adminLteLayout");
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {

                fix();
                fixSidebar();

                $(window, ".wrapper").resize(function () {
                    fix();
                    fixSidebar();
                });

                function fix() {
                    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                    var window_height = $(window).height();
                    var sidebar_height = $('.sidebar').height();
                    //Set the min-height of the content and sidebar based on the
                    //the height of the document.
                    if ($('body').hasClass('fixed')) {
                        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                    } else {
                        if (window_height >= sidebar_height) {
                            $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                        } else {
                            $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                        }
                    }
                }

                function fixSidebar() {
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                        console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }
                    //Enable slimscroll for fixed layout
                    if (typeof $.fn.slimScroll != 'undefined') {
                        //Distroy if it exists
                        $(".sidebar").slimScroll({destroy: true}).height("auto");
                        //Add slimscroll
                        $(".sidebar").slimscroll({
                            height: ($(window).height() - $(".main-header").height()) + "px",
                            color: "rgba(0,0,0,0.2)",
                            size: "3px"
                        });
                    }
                }
            }
        });
})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteSidebarToggleSwipe', function(){

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.contentSwipeArea = $('.content-swipe-area');

                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.sidebar-toggle');
                setTimeout(setHeight, 0);
                $(window).on('resize', setHeight);
                _this.contentSwipeArea.on("swiperight", openSidebar);
                _this.contentSwipeArea.on("swipeleft", closeSidebar);
                _this.sidebar.on("swipeleft", closeSidebar);
                _this.navbrand.on('click', toggleSidebar);
                _this.navbrand.on("swiperight", openSidebar);
                _this.navbrand.on("swipeleft", closeSidebar);
                _this.sidebartoggle.on("swiperight", openSidebar);
                _this.sidebartoggle.on("swipeleft", closeSidebar);
                function setHeight() {
                    _this.contentSwipeArea.css('height', _this.contentSwipeArea.parent().height());
                }

                function openSidebar() {

                    _this.body.stop().removeClass("sidebar-collapse");
                }

                function closeSidebar() {
                    _this.body.stop().addClass("sidebar-collapse");
                }

                function toggleSidebar() {
                    _this.body.toggleClass("sidebar-collapse");
                }
            }
        });

})();
(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteSidebarToggle', function(){

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                //Get the screen sizes
                var screenSizes = {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                };

                //Enable sidebar toggle
                $($element).click(function (e) {
                    e.preventDefault();

                    //Enable sidebar push menu
                    if ($(window).width() > (screenSizes.sm - 1)) {
                        $("body").toggleClass('sidebar-collapse');
                    }
                    //Handle sidebar push menu for small screens
                    else {
                        if ($("body").hasClass('sidebar-open')) {
                            $("body").removeClass('sidebar-open');
                            $("body").removeClass('sidebar-collapse')
                        } else {
                            $("body").addClass('sidebar-open');
                        }
                    }
                });
                //
                $(".content-wrapper").click(function () {
                    //Enable hide menu when clicking on the content-wrapper on small screens
                    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        $("body").removeClass('sidebar-open');
                    }
                });
            }
        });
})();
(function(){

    'use strict';

    angular.module('adminsys')

        .directive('adminLteTree', [function() {
            console.log("adminLteTree");
            return {
                restrict: '',
                link: link
            };

            function link($scope, $element, $attrs) {

                $("li a", $($element)).click(function (e) {
                    //Get the clicked link and the next element
                    var $this = $(this);
                    var checkElement = $this.next();

                    //Check if the next element is a menu and is visible
                    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                        //Close the menu
                        checkElement.slideUp('normal', function () {
                            checkElement.removeClass('menu-open');
                            //Fix the layout in case the sidebar stretches over the height of the window
                            //_this.layout.fix();
                        });
                        checkElement.parent("li").removeClass("active");
                    }
                    //If the menu is not visible
                    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                        //Get the parent menu
                        var parent = $this.parents('ul').first();
                        //Close all open menus within the parent
                        var ul = parent.find('ul:visible').slideUp('normal');
                        //Remove the menu-open class from the parent
                        ul.removeClass('menu-open');
                        //Get the parent li
                        var parent_li = $this.parent("li");

                        //Open the target menu and add the menu-open class
                        checkElement.slideDown('normal', function () {
                            //Add the class active to the parent li
                            checkElement.addClass('menu-open');
                            parent.find('li.active').removeClass('active');
                            parent_li.addClass('active');
                            //Fix the layout in case the sidebar stretches over the height of the window
                            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                            var window_height = $(window).height();
                            var sidebar_height = $('.sidebar').height();
                            //Set the min-height of the content and sidebar based on the
                            //the height of the document.
                            if ($('body').hasClass('fixed')) {
                                $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                            } else {
                                if (window_height >= sidebar_height) {
                                    $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                                } else {
                                    $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                                }
                            }
                        });
                    }
                    //if this isn't a link, prevent the page from being redirected
                    if (checkElement.is('.treeview-menu')) {
                        e.preventDefault();
                    }
                });
            }
        }]);

})();

(function() {
    'use strict';

    angular.module('adminsys')
        .factory('sidebarMenuService', function($http, $rootScope){

            return {
                getSidebar: function(){
                    return $http.get('themes/'+$rootScope.config.activeTheme+'/assets/data/sidebar.json');
                }
            };

        });
})();