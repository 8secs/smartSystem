(function(){
    'use strict';

    adminModule
        .directive('adminLteControlSidebar', function(){
            console.log("adminLteControlSidebar");
            return {
                restrict: 'A',
                link: link
            };

            function link($scope, $element, $attrs) {
                var _this = {};
                _this.body = $("body");
                _this.sidebar = $($element);
                _this.navbrand = $('.navbar-brand');
                _this.sidebartoggle = $('.control-sidebar-toggle');


                _this.navbrand.on('click', toggleSidebar);
                _this.sidebartoggle.on("click", toggleSidebar);


                function toggleSidebar() {
                    //If the sidebar is not open
                    if (!_this.sidebar.hasClass('control-sidebar-open') && !$('body').hasClass('control-sidebar-open')) {
                        console.log("toggleSidebar");
                        //Open the sidebar
                        open(_this.sidebar, true);
                    } else {
                        console.log("toggleSidebar close");
                        close(_this.sidebar, true);
                    }
                }

                //If the body has a boxed layout, fix the sidebar bg position
                _this.bg = $(".control-sidebar-bg");
                fix(_this.bg);

                //If the body has a fixed layout, make the control sidebar fixed
                if ($('body').hasClass('fixed')) {
                    fixForFixed(_this.sidebar);
                } else {
                    //If the content height is less than the sidebar's height, force max height
                    if ($('.content-wrapper, .right-side').height() < _this.sidebar.height()) {
                        fixForContent(_this.sidebar);
                    }
                }

                function open (sidebar, slide) {
                    //Slide over content
                    if (slide) {
                        sidebar.addClass('control-sidebar-open');
                    } else {
                        //Push the content by adding the open class to the body instead
                        //of the sidebar itself
                        $('body').addClass('control-sidebar-open');
                    }

                }

                function close  (sidebar, slide) {
                    if (slide) {
                        sidebar.removeClass('control-sidebar-open');
                    } else {
                        $('body').removeClass('control-sidebar-open');
                    }
                }

                function fix (sidebar) {
                    var _this = this;
                    if ($("body").hasClass('layout-boxed')) {
                        sidebar.css('position', 'absolute');
                        sidebar.height($(".wrapper").height());
                        $(window).resize(function () {
                            fix(sidebar);
                        });
                    } else {
                        sidebar.css({
                            'position': 'fixed',
                            'height': 'auto'
                        });
                    }

                }

                function fixForFixed(sidebar) {
                    sidebar.css({
                        'position': 'fixed',
                        'max-height': '100%',
                        'overflow': 'auto',
                        'padding-bottom': '50px'
                    });
                }

                function fixForContent(sidebar){
                    $(".content-wrapper, .right-side").css('min-height', sidebar.height());
                }
            }

        });

})();