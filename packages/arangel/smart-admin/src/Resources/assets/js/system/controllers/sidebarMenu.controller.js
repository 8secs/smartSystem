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