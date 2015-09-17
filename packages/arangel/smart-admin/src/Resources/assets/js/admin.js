'use strict';

var adminModule;

(function () {

    adminModule = angular.module('adminsys', [
            'ngResource',
            'ngTable',
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ui.multiselect'
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
        });

})();