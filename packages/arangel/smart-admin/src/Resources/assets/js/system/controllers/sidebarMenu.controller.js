(function() {

    'use strict';

    adminModule
        .controller('SidebarMenuCtrl', function($scope, sidebarMenuService, $auth, alertService){

            $scope.alerts = alertService.get();

            sidebarMenuService.getSidebar()
                .success(function(data, status, headers, config){
                    data = data || {};
                    $scope.menus = data.sidebar || [];
                });
        });

})();