'use strict';

module.exports = function (gulp, plugins, base_path, public_path) {
    return function () {
        gulp.src(base_path+'/**/*.less')
            .pipe(plugins.less())
            .pipe(gulp.dest(public_path+'assets/css'));
    };
};