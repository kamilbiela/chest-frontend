var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');

var htmlFiles = [
    './index.html',
    './app/**/*.html'
];

var cssFiles = [
    'app/app.js',
    'app/*.js',
    'app/**/*.js'
];

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('build', function () {
    var uglifyOptions = {
        mangle: false
    };

    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

gulp.task('watch', function () {
    var watcherCss = gulp.watch(cssFiles, ['build']);
    var watcherHtml = gulp.watch(htmlFiles, ['build']);
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('default', ['connect', 'watch']);
