(function(){
    'use strict';

    adminModule
        .directive('adminLteSidebarToggle', function(){

            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                //Get the screen sizes
                var screenSizes = {
                    xs: 480,
                    sm: 768,
                    md: 992,
                    lg: 1200
                };

                //Enable sidebar toggle
                $($element).click(function (e) {
                    e.preventDefault();

                    //Enable sidebar push menu
                    if ($(window).width() > (screenSizes.sm - 1)) {
                        $("body").toggleClass('sidebar-collapse');
                    }
                    //Handle sidebar push menu for small screens
                    else {
                        if ($("body").hasClass('sidebar-open')) {
                            $("body").removeClass('sidebar-open');
                            $("body").removeClass('sidebar-collapse')
                        } else {
                            $("body").addClass('sidebar-open');
                        }
                    }
                });
                //
                $(".content-wrapper").click(function () {
                    //Enable hide menu when clicking on the content-wrapper on small screens
                    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                        $("body").removeClass('sidebar-open');
                    }
                });
            }
        });
})();