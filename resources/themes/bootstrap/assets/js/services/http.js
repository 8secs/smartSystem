(function () {
    'use strict';

    angular.module('smartsys')
        .factory('HttpServ', function($http) {
            return {
                getSopportedLocales: function(){
                    return $http.get('/getSopportedLocales');
                }
            };
        });

})();