/**
 * Created by andres on 6/08/15.
 */

(function () {
    'use strict';

    adminModule
        .factory('AdminAccount', function($http) {
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
                storeProfile: function(profileDate){
                    return $http.post('/api/me/store-profile', profileDate);
                },
                updateProfile: function(profileDate){
                    return $http.post('/api/me/update-profile', profileDate);
                },
                password: function(data){
                    return $http.post('/auth/password/email', data);
                },
                reset: function(data){
                    return $http.post('/auth/password/reset', data);
                },
                getFriends: function(){
                    return $http.get('/api/me/friends');
                },
                addFriend: function(id){
                    return $http.post('/api/me/add-friend', {'id':id});
                },
                removeFriend: function(id){
                    return $http.post('/api/me/remove-friend', {'id':id});
                },
                getFollowers: function(){
                    return $http.get('/api/me/followers');
                },
                addFollower: function(id){
                    return $http.post('/api/me/add-follower', {'id':id});
                },
                removeFollower: function(id){
                    return $http.post('/api/me/remove-follower', {'id':id});
                },
                getFollowees: function(){
                    return $http.get('/api/me/following');
                },
                addFollowee: function(id){
                    return $http.post('/api/me/add-followee', {'id':id});
                },
                removeFollowee: function(id){
                    return $http.post('/api/me/remove-followee', {'id':id});
                },
                storeLocation: function(data){
                    return $http.post('/api/me/store-location', data);
                },
                updateLocation: function(data){
                    return $http.post('/api/me/update-location', data);
                }
            };
        });

})();
