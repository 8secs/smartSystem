(function(){
    'use strict';

    angular.module('auth')
        .service('ProfileService', function(Account, $q, $log, alertService){

            return {

                getUser: function(){
                    var deferred = $q.defer();
                    Account.getUser()
                        .then(
                        function(response){
                            var data = response.data;
                            //$log.log(data.user);
                            deferred.resolve({
                                user: data.user,
                                image: 'uploads/'+data.user.image,
                                roles: data.roles,
                                user_roles: data.user.roles,
                                about: data.user.profile
                            });
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }

            }
        });
})();