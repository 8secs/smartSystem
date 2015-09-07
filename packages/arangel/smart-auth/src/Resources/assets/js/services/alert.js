(function () {
    'use strict';

    angular.module('auth')
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