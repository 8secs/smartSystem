(function(){
    'use strict';

    angular.module('Admin')
        .directive('adminLteBoxWidget', function(){
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
        });

})();