/**
 * Created by andres on 6/08/15.
 */

(function (){
    'use strict';

    angular.module('auth')
        .directive('passwordMatch', function() {
            return {
                require: 'ngModel',
                scope: {
                    otherModelValue: '=passwordMatch'
                },
                link: function(scope, element, attributes, ngModel) {
                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue === scope.otherModelValue;
                    };
                    scope.$watch('otherModelValue', function() {
                        ngModel.$validate();
                    });
                }
            };
        });


})();
