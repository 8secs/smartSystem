(function(){
    'use strict';

    angular.module('adminsys')
        .directive('adminLteLayout', function(){
            console.log("adminLteLayout");
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {

                fix();
                fixSidebar();

                $(window, ".wrapper").resize(function () {
                    fix();
                    fixSidebar();
                });

                function fix() {
                    var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
                    var window_height = $(window).height();
                    var sidebar_height = $('.sidebar').height();
                    //Set the min-height of the content and sidebar based on the
                    //the height of the document.
                    if ($('body').hasClass('fixed')) {
                        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
                    } else {
                        if (window_height >= sidebar_height) {
                            $('.content-wrapper, .right-side').css('min-height', window_height - neg);
                        } else {
                            $('.content-wrapper, .right-side').css('min-height', sidebar_height);
                        }
                    }
                }

                function fixSidebar() {
                    if (!$("body").hasClass("fixed")) {
                        if (typeof $.fn.slimScroll != 'undefined') {
                            $(".sidebar").slimScroll({destroy: true}).height("auto");
                        }
                        return;
                    } else if (typeof $.fn.slimScroll == 'undefined' && console) {
                        console.error("Error: the fixed layout requires the slimscroll plugin!");
                    }
                    //Enable slimscroll for fixed layout
                    if (typeof $.fn.slimScroll != 'undefined') {
                        //Distroy if it exists
                        $(".sidebar").slimScroll({destroy: true}).height("auto");
                        //Add slimscroll
                        $(".sidebar").slimscroll({
                            height: ($(window).height() - $(".main-header").height()) + "px",
                            color: "rgba(0,0,0,0.2)",
                            size: "3px"
                        });
                    }
                }
            }
        });
})();