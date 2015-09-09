'use strict';

(function() {
    angular.module('Admin')
        .controller('layoutCtrl', layoutCtrl);


    function layoutCtrl($scope, $rootScope) {
        $scope.title = 'default title';
        $scope.subtitle = 'default subtitle';

        $rootScope.stylesheets = [
            {href: 'css/admin/app.css', type: 'text/css'},
            {href: 'css/admin/admin.css', type: 'text/css'}
        ];
    }

    layoutCtrl.$inject = ['$scope', '$rootScope'];
})();