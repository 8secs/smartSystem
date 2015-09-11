(function(){

    'use strict';

    angular.module('adminsys')

        .directive('adminLteTree', [function() {
            console.log("adminLteTree");
            return {
                restrict: '',
                link: link
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
        }]);

})();
