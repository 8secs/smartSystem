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
