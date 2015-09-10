/**
 * Created by andres on 10/08/15.
 */
(function (){
    'use strict';

    angular.module('Admin')
        .factory('User', function($http){

            return {
                getUsers: function(){
                    return $http.get('api/dashboard/users');
                },
                getUser: function(id){
                    return $http.get('api/dashboard/user/'+id);
                },
                updateUser: function(data){
                    return $http.post('api/dashboard/user/update-user', data);
                },
                deleteUser: function(id){
                    return $http.post('api/dashboard/user/destroy-user', {id: id});
                }
            };

        })

})();
