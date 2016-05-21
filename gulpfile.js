var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var del = require('del');

gulp.task('clean', function() {
    del.sync('dist/');
});

gulp.task('build-max', function() {
    return gulp.src('src/*.js')
        .pipe(concat('angular-slate.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-min', function() {
    return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('angular-slate.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('build', ['clean', 'lint', 'build-max', 'build-min']);
