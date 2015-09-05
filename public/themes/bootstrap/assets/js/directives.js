/**
 * Created by andres on 11/08/15.
 */
(function(){
    'use strict';

    angular.module('smartsys')
        .directive('checkImage', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    attrs.$observe('ngSrc', function(ngSrc) {
                        if(typeof ngSrc !== 'undefined'){
                            if(ngSrc.indexOf('data:image') == -1){
                                $http.get(ngSrc).success(function(){
                                }).error(function(){
                                    if(typeof scope.config.activeTheme !== 'undefined'){
                                        element.attr('src', 'themes/'+scope.config.activeTheme+'/assets/images/default_picture.png');
                                    }else element.attr('src', '/assets/images/default_picture.png'); // set default image
                                });
                            }
                        }else{
                            console.log(scope.config);
                            if(typeof scope.config.activeTheme !== 'undefined'){
                                element.attr('src', 'themes/'+scope.config.activeTheme+'/assets/images/default_picture.png');
                            }else element.attr('src', '/assets/images/default_picture.png'); // set default image
                        }
                    });
                }
            };
    });

})();

//# sourceMappingURL=directives.js.map