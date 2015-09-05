(function(){
    'use strict';

    angular.module('smartsys')
        .service('GlobalService', function(HttpServ, $q, $log, alertService){

            return {

                getSopportedLocales: function(){
                    var deferred = $q.defer();
                    HttpServ.getSopportedLocales()
                        .then(function(response){
                            var data = response.data;
                            deferred.resolve({
                                sopportedLocales: data.sopportedLocales,
                                currentLocale: data.currentLocale
                            })
                        }, function(response){
                            deferred.reject(response.status);
                            alertService.add('error', "Request fail. Error server code: " + response.status);
                        });
                    return deferred.promise;
                }
            }
        });
})();