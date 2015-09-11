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