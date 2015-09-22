(function(){
    'use strict';

    adminModule
        .service('AdminProfile', function(AdminAccount, $q, $log, alertService){

            return {
                getUserLocationByIp: function(){
                    var deferred = $q.defer();
                    AdminAccount.getIpInfo()
                        .then(function(response){
                            var ip = response.data.ip;
                            var hostname = response.data.hostname;
                            var location = response.data.loc;
                            var loc = location.split(",");
                            var city = response.data.city;
                            var country = response.data.country;
                            $log.log(loc);
                            deferred.resolve({
                                ip: ip,
                                hostname: hostname,
                                loc: loc,
                                city: city,
                                country: country
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error from Server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getUser: function(){
                    var deferred = $q.defer();
                    AdminAccount.getUser()
                        .then(
                        function(response){
                            var data = response.data;
                            $log.log(data);
                            deferred.resolve({
                                user: data.user,
                                image: 'uploads/'+data.user.image,
                                roles: data.roles,
                                activities: data.activities,
                                user_roles: data.user.roles,
                                about: data.user.profile
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateUser: function(data){
                    var deferred = $q.defer();
                    AdminAccount.updateUser(data)
                        .then(function(response){
                            alertService.add('success', 'User updated.');

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });

                    return deferred.promise;

                },
                storeProfile: function(data){
                    var deferred = $q.defer();
                    AdminAccount.storeProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateProfile: function(data){
                    var deferred = $q.defer();
                    AdminAccount.updateProfile(data)
                        .then(function(response){
                            alertService.add('success', "User's Profile has been update.");

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFriends: function(){
                    var deferred = $q.defer();
                    AdminAccount.getFriends()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                not_friends: data.not_friends,
                                friends: data.friends
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowees: function(){
                    var deferred = $q.defer();
                    AdminAccount.getFollowees()
                        .then(function(response){
                            var data = response.data;
                            var users = data.users;
                            var followees = data.followees;
                            angular.forEach(users, function(user){
                                angular.forEach(followees, function(followee){
                                    //console.log("f= " + followee.id + " u= " + user.id);
                                    if(followee.id == user.id) user.isFollowing = true;
                                });
                            });

                            deferred.resolve({
                                users: users,
                                followees: followees
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                getFollowers: function(){
                    var deferred = $q.defer();
                    AdminAccount.getFollowers()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                followers: data.followers
                            });

                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFriend: function(id){
                    var deferred = $q.defer();
                    AdminAccount.addFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFriend: function(id){
                    var deferred = $q.defer();
                    AdminAccount.removeFriend(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                addFollowee: function(id){
                    var deferred = $q.defer();
                    AdminAccount.addFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                removeFollowee: function(id){
                    var deferred = $q.defer();
                    AdminAccount.removeFollowee(id)
                        .then(function(response){
                            deferred.resolve({
                                success: response.status
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                storeLocation: function(data){
                    var deferred = $q.defer();
                    AdminAccount.storeLocation(data)
                        .then(function(response){
                            deferred.resolve({
                                address: response.data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                },
                updateLocation: function(data){
                    var deferred = $q.defer();
                    AdminAccount.updateLocation(data)
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                data: data
                            });
                            alertService.add('success', "Data has been added.");
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }


            };
        });

})();