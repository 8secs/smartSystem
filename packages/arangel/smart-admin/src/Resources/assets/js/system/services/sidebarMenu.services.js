(function() {
    'use strict';

    adminModule
        .factory('sidebarMenuService', function($http, $rootScope){

            return {
                getSidebar: function(){
                    return $http.get('themes/'+$rootScope.config.activeTheme+'/assets/data/sidebar.json');
                }
            };

        });
})();