var elixir = require('laravel-elixir'),
    gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();


elixir.config.assetsPath = 'resources/themes/bootstrap/assets';
var themeResources = 'resources/themes/bootstrap/';
var public_path = './public/themes/bootstrap/';
var packages_path = './packages/arangel/';

var paths = {
    'jquery': './vendor/bower_components/jquery/',
    'bootstrap': './vendor/bower_components/bootstrap/',
    'angularBootstrap' : './vendor/bower_components/angular-bootstrap/',
    'angular': "./vendor/bower_components/angular/",
    'angularResource' : './vendor/bower_components/angular-resource/',
    'angularMessages' : './vendor/bower_components/angular-messages/',
    'angularUiRoute': "./vendor/bower_components/angular-ui-router/",
    'angularCookie': './vendor/bower_components/angular-cookie/',
    'angularCookies': './vendor/bower_components/angular-cookies/',
    'angularAnimate' : './vendor/bower_components/angular-animate/',
    'angularTranslate' : './vendor/bower_components/angular-translate/',
    'angularTranslateLoader' : './vendor/bower_components/angular-translate-loader-url/',
    'angularTranslateStaticLoader' : './vendor/bower_components/angular-translate-loader-static-files/',
    'angularTranslateStorageLocal' : './vendor/bower_components/angular-translate-storage-local/',
    'angularTranslateStorageCookie' : './vendor/bower_components/angular-translate-storage-cookie/',
    'angularSanitize' : './vendor/bower_components/angular-sanitize/',
    'angularTokenAuth': './vendor/bower_components/ng-token-auth/dist/',
    'satellizer' : './vendor/bower_components/satellizer/'
};

function getTask(task, b_path, p_path) {
    return require('./gulp-tasks/' + task)(gulp, plugins, b_path, p_path);
}

elixir(function(mix) {

    gulp.task('auth-scripts', getTask('auth-scripts', packages_path+'/smart-auth/src/Resources/assets/js', public_path));
    gulp.task('auth-less', getTask('less', packages_path+'/smart-auth/src/Resources/assets/less', public_path));
    gulp.task('auth-jade', getTask('jade', packages_path+'/smart-auth/src/Resources/jade', public_path));
    //gulp.task('auth-lang', getTask('auth-lang', packages_path+'/smart-auth/src/Resources/lang', themeResources+'assets/resources/'));

    gulp.task('jade', function() {
        gulp.src(themeResources+'jade/**/*.jade')
            .pipe(plugins.jade({
                pretty: !plugins.util.env.production
            }))
            .pipe(gulp.dest(public_path));
    });

    gulp.task('images', function () {
        gulp.src(elixir.config.assetsPath+'/images/*.{png,gif,jpg,svg}', {base: elixir.config.assetsPath+'/images'})
            .pipe(gulp.dest(public_path+'assets/images'));
    });

    gulp.task('locales', function () {
        gulp.src(elixir.config.assetsPath+'/resources/*.json', {base: elixir.config.assetsPath+'/resources'})
            .pipe(gulp.dest(public_path+'assets/resources'));
    });

    mix.task('auth-scripts')
        .task('auth-less')
        .task('auth-jade')
        //.task('auth-lang')
        .less('styles.less', public_path+'assets/css/styles.css')
        .task('jade', themeResources+'jade/**/*.jade')
        .copy(paths.bootstrap + 'fonts/**', public_path+'assets/fonts/bootstrap')
        .task('images', elixir.config.assetsPath+'/images/**/*.{png,gif,jpg,svg}')
        .task('locales', elixir.config.assetsPath+'/resources/**/*.json')
        .scripts([
            paths.jquery + "dist/jquery.js",
            paths.bootstrap + "dist/js/bootstrap.min.js",
            paths.angular + "angular.js",
            paths.angularBootstrap + "ui-bootstrap.min.js",
            paths.angularBootstrap + "ui-bootstrap-tpls.min.js",
            paths.angularResource + 'angular-resource.min.js',
            paths.angularMessages + 'angular-messages.min.js',
            paths.angularUiRoute + "release/angular-ui-router.min.js",
            paths.angularAnimate + 'angular-animate.min.js',
            paths.angularTranslate + 'angular-translate.min.js',
            paths.angularTranslateLoader + 'angular-translate-loader-url.min.js',
            paths.angularTranslateStaticLoader + 'angular-translate-loader-static-files.min.js',
            paths.angularTranslateStorageLocal + 'angular-translate-storage-local.min.js',
            paths.angularTranslateStorageCookie + 'angular-translate-storage-cookie.min.js',
            paths.angularCookies + 'angular-cookies.min.js',
            paths.angularSanitize + 'angular-sanitize.min.js',
            paths.satellizer + 'satellizer.min.js'
        ], public_path+'assets/js/scripts.js')
        .scripts(["app.js"
        ], public_path+'assets/js/app.js')
        .scripts([
            "controllers/public.js"
        ], public_path+'assets/js/controllers.js')
        .scripts([
            "directives/checkImage.js"
        ], public_path+'assets/js/directives.js')
        .scripts([
            "services/alert.js",
            "services/global.js",
            "services/http.js"
        ], public_path+'assets/js/services.js')
        .scripts([
            "libs/es5-shim.min.js",
            "libs/es5-sham.min.js",
            "libs/console.sham.js"
        ], public_path+'assets/js/libs.js')
});
