/**
 * Created by andres on 10/08/15.
 */
(function () {
    'use strict';

    adminModule.controller('UserCtrl', function ($scope, $state, $stateParams, alertService, $modal, User, $filter, ngTableParams){

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
