'use strict';

module.exports = function (gulp, plugins, base_path, public_path) {
    return function () {
        gulp.src(base_path+'/*.{png,gif,jpg,svg}', {base: base_path+'/images'})
            .pipe(gulp.dest(public_path+'assets/images'));
    };
};