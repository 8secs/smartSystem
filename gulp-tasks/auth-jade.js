'use strict';

module.exports = function (gulp, plugins, base_path, public_path) {
    return function () {

        gulp.src(base_path+'/**/*.jade')
            .pipe(plugins.jade({
                pretty: !plugins.util.env.production
            }))
            .pipe(gulp.dest(public_path));
    };
};