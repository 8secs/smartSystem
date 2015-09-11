(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteSidebarToggleSwipe', function(){

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.contentSwipeArea = $('.content-swipe-area');

                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.sidebar-toggle');
                setTimeout(setHeight, 0);
                $(window).on('resize', setHeight);
                _this.contentSwipeArea.on("swiperight", openSidebar);
                _this.contentSwipeArea.on("swipeleft", closeSidebar);
                _this.sidebar.on("swipeleft", closeSidebar);
                _this.navbrand.on('click', toggleSidebar);
                _this.navbrand.on("swiperight", openSidebar);
                _this.navbrand.on("swipeleft", closeSidebar);
                _this.sidebartoggle.on("swiperight", openSidebar);
                _this.sidebartoggle.on("swipeleft", closeSidebar);
                function setHeight() {
                    _this.contentSwipeArea.css('height', _this.contentSwipeArea.parent().height());
                }

                function openSidebar() {

                    _this.body.stop().removeClass("sidebar-collapse");
                }

                function closeSidebar() {
                    _this.body.stop().addClass("sidebar-collapse");
                }

                function toggleSidebar() {
                    _this.body.toggleClass("sidebar-collapse");
                }
            }
        });

})();