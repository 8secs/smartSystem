(function() {
    'use strict';

    adminModule
        .controller('layoutCtrl', function($scope, $rootScope){
            $scope.title = 'default title';
            $scope.subtitle = 'default subtitle';

            $rootScope.stylesheets = [
                {href: 'css/admin/app.css', type: 'text/css'},
                {href: 'css/admin/admin.css', type: 'text/css'}
            ];
        });
})();