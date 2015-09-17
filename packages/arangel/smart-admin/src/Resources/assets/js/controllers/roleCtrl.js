/**
 * Created by andres on 9/08/15.
 */
(function () {
    'use strict';

    adminModule.controller('RoleCtrl', function ($scope,
                                          alertService,
                                          $state,
                                          $stateParams,
                                          Role,
                                          ngTableParams){

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
