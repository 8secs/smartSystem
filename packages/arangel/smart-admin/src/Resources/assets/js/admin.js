(function () {
    'use strict';

    angular.module('Admin', ['ngResource',
            'ngTable',
            'ui.multiselect',
            'uiGmapgoogle-maps'
        ])
        .config(function(uiGmapGoogleMapApiProvider){
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyCdwv6fBwKiwrRkV9E9qWWzqWjDuSucyQA',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });

        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $stateProvider

                .state('admin',{
                    abstract: true,
                    resolve: {
                        authenticated: function($q, $location, $auth) {
                            var deferred = $q.defer();
                            if (!$auth.isAuthenticated()) {
                                //$location.path('/login');
                                console.log("noAuth");
                            } else {
                                deferred.resolve();
                            }
                            return deferred.promise;
                        }
                    },
                    views: {
                        '@' : {
                            templateUrl: 'themes/bootstrap/layouts/admin.html',
                            controller: 'layoutCtrl'
                        },
                        'header@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/header.html',
                            controller: 'NavbarCtrl'
                        },
                        'sidebar@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/sidebar.html',
                            controller: 'SidebarMenuCtrl'
                        },
                        'footer@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/footer.html'
                        },
                        'control@admin': {
                            templateUrl: 'themes/bootstrap/includes/admin/control-sidebar.html'
                        }
                    }
                })
                .state('dashboard',{
                    url: '/dashboard',
                    templateUrl: 'themes/bootstrap/partials/admin/dashboard.html',
                    controller: 'DashboardCtrl',
                    parent: 'admin'
                })
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

            $urlRouterProvider.otherwise('/');

        });

})();