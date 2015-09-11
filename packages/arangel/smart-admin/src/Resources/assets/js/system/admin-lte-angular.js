(function () {
    'use strict';

    angular
        .module('adminsys', [])
        .directive('adminLteLayout', adminLteLayoutDirective)
        .directive('adminLteTree', adminLteTreeDirective)
        .directive('adminLteSidebarToggle', adminLteSidebarToggleDirective)
        .directive('adminLteSidebarToggleSwipe', adminLteSidebarToggleSwipeDirective)
        .directive('adminLteBoxWidget', adminLteBoxWidgetDirective);

    function adminLteLayoutDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
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
    }

    function adminLteTreeDirective() {
        return {
            restrict: '',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $("li a", $($element)).click(function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
                    //Close the menu
                    checkElement.slideUp('normal', function () {
                        checkElement.removeClass('menu-open');
                        //Fix the layout in case the sidebar stretches over the height of the window
                        //_this.layout.fix();
                    });
                    checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp('normal');
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown('normal', function () {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                        //Fix the layout in case the sidebar stretches over the height of the window
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
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        }
    }

    function adminLteSidebarToggleDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
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
    }

    function adminLteSidebarToggleSwipeDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
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
    }

    function adminLteBoxWidgetDirective() {
        return {
            restrict: 'A',
            link: link,
            scope: {}
        };

        function link($scope, $element, $attrs) {

            $($element).find('[data-widget="collapse"]').click(function (e) {
                e.preventDefault();
                collapse();
            });

            $($element).find('[data-widget="remove"]').click(function (e) {
                e.preventDefault();
                remove();
            });

            function collapse() {
                //Find the box parent
                var box = $($element);
                //Find the body and the footer
                var bf = box.find(".box-body, .box-footer");
                if (!box.hasClass("collapsed-box")) {
                    //Convert minus into plus
                    $($element).find('[data-widget="collapse"]').children(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
                    bf.slideUp(300, function () {
                        box.addClass("collapsed-box");
                    });
                } else {
                    //Convert plus into minus
                    $($element).find('[data-widget="collapse"]').children(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
                    bf.slideDown(300, function () {
                        box.removeClass("collapsed-box");
                    });
                }
            }

            function remove() {
                //Find the box parent
                $($element).slideUp();
            }
        }
    }

})();