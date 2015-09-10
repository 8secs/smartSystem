(function(){
    'use strict';

    angular.module('auth', ['ngResource',
            'ngMessages',
            'ui.router',
            'ui.bootstrap',
            'satellizer'
        ])
        .config(
            function($translateProvider){
                $translateProvider.useStaticFilesLoader({
                    prefix: 'themes/bootstrap/assets/resources/auth/locale-',
                    suffix: '.json'
                });
                $translateProvider.determinePreferredLanguage();
                $translateProvider.useLocalStorage();
                $translateProvider.useSanitizeValueStrategy('sanitize');
        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider) {

            $stateProvider
                /*.state('public',{
                    templateUrl: 'themes/bootstrap/layouts/web.html',
                    abstract: true,
                    controller: 'WebCtrl'
                })*/
                .state('login', {
                    url: '/login',
                    templateUrl: 'themes/bootstrap/partials/login.html',
                    controller: 'LoginCtrl',
                    parent: 'public'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'themes/bootstrap/partials/signup.html',
                    controller: 'SignupCtrl',
                    parent: 'public'
                })
                .state('password', {
                    url: '/password',
                    templateUrl: 'themes/bootstrap/partials/password.html',
                    controller: 'LoginCtrl',
                    parent: 'public'
                })
                .state('reset', {
                    url: '/reset/:token',
                    templateUrl: 'themes/bootstrap/partials/reset.html',
                    controller: 'LoginCtrl',
                    parent: 'public'
                })
                .state('logout', {
                    url: '/logout',
                    template: null,
                    controller: 'LogoutCtrl'
                });

            $urlRouterProvider.otherwise('/');

            $authProvider.facebook({
                clientId: '657854390977827'
            });
        })

})();
(function(){
    'use strict';

    angular.module('auth')

        .controller('AuthCtrl', function($rootScope,
                                         $state,
                                         $stateParams,
                                         $scope,
                                         $log,
                                         $auth,
                                         ProfileService,
                                         alertService)
        {
            var stylesheets = {href: 'themes/'+$rootScope.config.activeTheme+'/assets/css/auth.css', type: 'text/css'};

            $rootScope.addStylesheet(stylesheets);

            $scope.isAuthenticated = function() {
                return $auth.isAuthenticated();
            };

            $scope.isAdmin = function(){
                return $scope.userProfile.user ? $scope.userProfile.user.isAdmin : false;
            };

            /**
             * Get user's profile information.
             */
            $scope.getUser = function() {

                var promise = ProfileService.getUser();
                promise.then(
                    function(data){
                        $scope.userProfile = data;
                    },
                    function(error){
                        alertService.add('error', error);
                    });
            };
            if($scope.isAuthenticated()) $scope.getUser();
        });
})();
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

/**
 * Created by andres on 6/08/15.
 */

(function (){
    'use strict';

    angular.module('auth')
        .directive('passwordStrength', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    var indicator = element.children();
                    var dots = Array.prototype.slice.call(indicator.children());
                    var weakest = dots.slice(-1)[0];
                    var weak = dots.slice(-2);
                    var strong = dots.slice(-3);
                    var strongest = dots.slice(-4);

                    element.after(indicator);

                    element.bind('keyup', function() {
                        var matches = {
                                positive: {},
                                negative: {}
                            },
                            counts = {
                                positive: {},
                                negative: {}
                            },
                            tmp,
                            strength = 0,
                            letters = 'abcdefghijklmnopqrstuvwxyz',
                            numbers = '01234567890',
                            symbols = '\\!@#$%&/()=?¿',
                            strValue;

                        angular.forEach(dots, function(el) {
                            el.style.backgroundColor = '#ebeef1';
                        });

                        if (ngModel.$viewValue) {
                            // Increase strength level
                            matches.positive.lower = ngModel.$viewValue.match(/[a-z]/g);
                            matches.positive.upper = ngModel.$viewValue.match(/[A-Z]/g);
                            matches.positive.numbers = ngModel.$viewValue.match(/\d/g);
                            matches.positive.symbols = ngModel.$viewValue.match(/[$-/:-?{-~!^_`\[\]]/g);
                            matches.positive.middleNumber = ngModel.$viewValue.slice(1, -1).match(/\d/g);
                            matches.positive.middleSymbol = ngModel.$viewValue.slice(1, -1).match(/[$-/:-?{-~!^_`\[\]]/g);

                            counts.positive.lower = matches.positive.lower ? matches.positive.lower.length : 0;
                            counts.positive.upper = matches.positive.upper ? matches.positive.upper.length : 0;
                            counts.positive.numbers = matches.positive.numbers ? matches.positive.numbers.length : 0;
                            counts.positive.symbols = matches.positive.symbols ? matches.positive.symbols.length : 0;

                            counts.positive.numChars = ngModel.$viewValue.length;
                            tmp += (counts.positive.numChars >= 8) ? 1 : 0;

                            counts.positive.requirements = (tmp >= 3) ? tmp : 0;
                            counts.positive.middleNumber = matches.positive.middleNumber ? matches.positive.middleNumber.length : 0;
                            counts.positive.middleSymbol = matches.positive.middleSymbol ? matches.positive.middleSymbol.length : 0;

                            // Decrease strength level
                            matches.negative.consecLower = ngModel.$viewValue.match(/(?=([a-z]{2}))/g);
                            matches.negative.consecUpper = ngModel.$viewValue.match(/(?=([A-Z]{2}))/g);
                            matches.negative.consecNumbers = ngModel.$viewValue.match(/(?=(\d{2}))/g);
                            matches.negative.onlyNumbers = ngModel.$viewValue.match(/^[0-9]*$/g);
                            matches.negative.onlyLetters = ngModel.$viewValue.match(/^([a-z]|[A-Z])*$/g);

                            counts.negative.consecLower = matches.negative.consecLower ? matches.negative.consecLower.length : 0;
                            counts.negative.consecUpper = matches.negative.consecUpper ? matches.negative.consecUpper.length : 0;
                            counts.negative.consecNumbers = matches.negative.consecNumbers ? matches.negative.consecNumbers.length : 0;

                            // Calculations
                            strength += counts.positive.numChars * 4;
                            if (counts.positive.upper) {
                                strength += (counts.positive.numChars - counts.positive.upper) * 2;
                            }
                            if (counts.positive.lower) {
                                strength += (counts.positive.numChars - counts.positive.lower) * 2;
                            }
                            if (counts.positive.upper || counts.positive.lower) {
                                strength += counts.positive.numbers * 4;
                            }
                            strength += counts.positive.symbols * 6;
                            strength += (counts.positive.middleSymbol + counts.positive.middleNumber) * 2;
                            strength += counts.positive.requirements * 2;

                            strength -= counts.negative.consecLower * 2;
                            strength -= counts.negative.consecUpper * 2;
                            strength -= counts.negative.consecNumbers * 2;

                            if (matches.negative.onlyNumbers) {
                                strength -= counts.positive.numChars;
                            }
                            if (matches.negative.onlyLetters) {
                                strength -= counts.positive.numChars;
                            }

                            strength = Math.max(0, Math.min(100, Math.round(strength)));

                            if (strength > 85) {
                                angular.forEach(strongest, function(el) {
                                    el.style.backgroundColor = '#008cdd';
                                });
                            } else if (strength > 65) {
                                angular.forEach(strong, function(el) {
                                    el.style.backgroundColor = '#6ead09';
                                });
                            } else if (strength > 30) {
                                angular.forEach(weak, function(el) {
                                    el.style.backgroundColor = '#e09115';
                                });
                            } else {
                                weakest.style.backgroundColor = '#e01414';
                            }
                        }
                    });
                },
                template: '<span class="password-strength-indicator"><span></span><span></span><span></span><span></span></span>'
            };
        });


})();

/**
 * Created by andres on 6/08/15.
 */

(function () {
    'use strict';

    angular.module('auth')
        .factory('Account', function($http) {
            return {
                getIpInfo: function(){
                    return $http.get('http://ipinfo.io/json');
                },
                getUser: function() {
                    var url = "/api/me";
                    return $http.get(url);
                },
                updateUser: function(profileData) {
                    return $http.put('/api/me', profileData);
                },
                uploadImage: function(profileDate){
                    return $http.post('/api/me/image', profileDate);
                },
                password: function(data){
                    return $http.post('/auth/password/email', data);
                },
                reset: function(data){
                    return $http.post('/auth/password/reset', data);
                }
            };
        });

})();

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
(function (){
    'use strict';

    angular.module('auth')
        .controller('LoginCtrl', function($scope,
                                        $state,
                                        $stateParams,
                                        alertService,
                                        $auth,
                                        Account,
                                        $log) {

            $scope.alerts = alertService.get();

            $scope.login = function() {
                $auth.login({ email: $scope.email, password: $scope.password })
                    .then(function() {
                        alertService.add('success', 'You have successfully logged in');
                        //$scope.getUser();
                        $state.transitionTo('home', $stateParams, {reload: true});
                    })
                    .catch(function(response) {
                        if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                        else  alertService.add('danger', response.data ? response.data.message : response);

                    });
            };
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider)
                    .then(function() {
                        alertService.add('success', 'You have successfully logged in');
                    })
                    .catch(function(response) {
                        alertService.add('danger', response.data ? response.data.message : response);
                    });
            };

            $scope.password = function() {
                Account.password({
                    email: $scope.email
                })
                .then(function() {
                        alertService.add('success', 'Reset your password');
                })
                .catch(function(response) {
                    if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                    else  alertService.add('danger', response.data ? response.data.message : response);

                });

            };

            $scope.resetPassword = function() {
                Account.reset({
                    email: $scope.email,
                    password: $scope.password,
                    password_confirmation: $scope.confirmPassword,
                    token: $scope.token
                })
                .then(function() {
                        alertService.add('success', 'Reset your password');
                })
                .catch(function(response) {
                        $log.log(response);
                        if(response.status == 500) alertService.add('danger', response.statusText + ": code: " + response.status);
                        else  alertService.add('danger', response.data ? response.data.message : response);

                });

            };

            if($stateParams.token) $scope.token = $stateParams.token;

        });

})();
(function (){
    'use strict';

    angular.module('auth')
        .controller('LogoutCtrl', function($auth, $state, alertService) {
            if (!$auth.isAuthenticated()) {
                return;
            }
            $auth.logout()
                .then(function() {
                    $state.go('home');
                    alertService.add('success', "log out.");
                });
        });

})();
(function (){
    'use strict';

    angular.module('auth')
        .controller('SignupCtrl',  function($scope, alertService, $auth) {

            $scope.alerts = alertService.get();

            $scope.signup = function() {
                $auth.signup({
                    displayName: $scope.displayName,
                    email: $scope.email,
                    password: $scope.password
                }).catch(function(response) {
                    if (typeof response.data.message === 'object') {
                        angular.forEach(response.data.message, function(message) {
                            alertService.add('danger', message[0]);
                        });
                        /**
                         * Update user
                         */
                        $scope.getUser();

                    } else {
                        alertService.add('danger', response.data.message);
                    }
                });
            };
        });

})();