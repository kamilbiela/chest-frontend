var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var htmlFiles = [
  './index.html',
  './app/**/*.html'
];

var jsFiles = [
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

  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify(uglifyOptions))
    .pipe(sourcemaps.write('.', {sourceRoot: './app/'}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  var watcherJs = gulp.watch(jsFiles, ['build', 'lint']);
  var watcherHtml = gulp.watch(htmlFiles, ['build']);
});

gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
