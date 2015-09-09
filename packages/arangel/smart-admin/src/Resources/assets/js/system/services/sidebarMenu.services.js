'use strict';

(function() {

    function sidebarMenuService($http) {
        function getSidebar() {
            return $http.get('assets/data/sidebar.json');
        }


        return {
            getSidebar: getSidebar
        };


    }

    sidebarMenuService.$inject = ['$http'];


    angular.module('Admin')

        .service('sidebarMenuService', sidebarMenuService);


})();