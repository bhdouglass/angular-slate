var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var gopen = require('gulp-open');
var surge = require('gulp-surge');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var del = require('del');
var fs = require('fs');

var paths = {
    dist: {
        base: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
    },
    js: 'src/*.js',
    css: 'src/*.css',
};

gulp.task('clean', function() {
    del.sync(paths.dist.base);
});

gulp.task('build-max-css', function() {
    return gulp.src(paths.css)
        .pipe(concat('angular-slate.css'))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('build-min-css', function() {
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(concat('angular-slate.min.css'))
        .pipe(cleancss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('build-max-js', function() {
    return gulp.src(paths.js)
        .pipe(concat('angular-slate.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('build-min-js', function() {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('angular-slate.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('build-js', ['lint', 'build-max-js', 'build-min-js']);
gulp.task('build-css', ['build-max-css', 'build-min-css']);
gulp.task('build', ['clean', 'build-js', 'build-css']);

gulp.task('watch', function() {
    gulp.watch(paths.js, ['build-js']);
    gulp.watch(paths.css, ['build-css']);
})

gulp.task('serve', ['build', 'watch'], function() {
    connect.server({
        root: '.',
        ip: '0.0.0.0',
        port: 9000,
    });

    return gulp.src('index.html')
        .pipe(gopen({uri: 'http://localhost:9000'}));
});

gulp.task('deploy', ['build'], function() {
    return surge({
        project: '.',
        domain: fs.readFileSync('./CNAME', 'utf-8'),
    });
});
