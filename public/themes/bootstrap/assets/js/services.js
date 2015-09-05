(function () {
    'use strict';

    angular.module('smartsys')
        .factory('alertService', alertService);

    alertService.$inject = ['$timeout'];

    function alertService($timeout) {
        var service = {
                add: add,
                closeAlert: closeAlert,
                closeAlertIdx: closeAlertIdx,
                clear: clear,
                get: get
            },
            alerts = [];

        return service;

        function add(type, msg) {
            var alert = {
                type: type,
                msg: msg,
                close: function() {
                    return closeAlert(this);
                }
            };
            $timeout(closeAlert, 3500, true, alert);
            return alerts.push(alert);
        }

        function closeAlert(alert) {
            return closeAlertIdx(alerts.indexOf(alert));
        }

        function closeAlertIdx(index) {
            return alerts.splice(index, 1);
        }

        function clear(){
            alerts.splice(0,alerts.length)
        }

        function get() {
            return alerts;
        }
    }
})();
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
//# sourceMappingURL=services.js.map