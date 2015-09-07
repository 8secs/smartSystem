/**
 * Created by andres on 6/08/15.
 */

(function () {
    'use strict';

    angular.module('auth')
        .factory('Account', function($http) {
            return {
                getIpInfo: function(){
                    return $http.get('http://ipinfo.io/json');
                },
                getUser: function() {
                    var url = "/api/me";
                    return $http.get(url);
                },
                updateUser: function(profileData) {
                    return $http.put('/api/me', profileData);
                },
                uploadImage: function(profileDate){
                    return $http.post('/api/me/image', profileDate);
                },
                password: function(data){
                    return $http.post('/auth/password/email', data);
                },
                reset: function(data){
                    return $http.post('/auth/password/reset', data);
                }
            };
        });

})();
