'use strict';

module.exports = function (gulp, plugins, base_path, public_path) {
    return function () {

        gulp.src(base_path+'/**/*.json', {base: base_path+'/resources'})
            .pipe(gulp.dest(public_path+'assets/resources'));
    };
};