'use strict';

module.exports = function (gulp, plugins, base_path, public_path) {
    return function () {
        gulp.src(base_path+'/**/*.js')
            .pipe(plugins.concat('admin-scripts.js'))
            .pipe(gulp.dest(public_path+'assets/js'));
    };
};