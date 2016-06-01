var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tslint = require('gulp-tslint');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');

var tsProject = tsc.createProject('tsconfig.json');
var config = require('./gulp.config');

gulp.task('clean-js', function () {
    return gulp
        .src(config.jsCleanFiles, {read: false})
        .pipe(rimraf())
});

gulp.task('compile-ts', function () {

    return gulp
        .src(config.tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.outputDir))
        .pipe(browserSync.stream());
});

gulp.task('ts-lint', function () {
    return gulp
        .src(config.tsLintFiles)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
            emirError: false
        }));
});

gulp.task('js-lint', function () {
    gulp
        .src(config.jsServerFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
    return gulp
        .src(config.sassInput)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest(config.outputCss))
        .pipe(browserSync.stream())
        .pipe(sourcemaps.write('./maps'));
});

gulp.task('watch', function () {
    gulp.watch([config.tsLintFiles], ['ts-lint', 'compile-ts']);
    gulp.watch(config.jsServerFiles, ['js-lint']);
    gulp.watch(['./server/views/index.ejs', './client/app/**/*.html']).on('change', browserSync.reload);
    gulp.watch([config.sassFiles], ['sass']);
});

gulp.task('serve', ['ts-lint', 'js-lint', 'compile-ts', 'sass', 'watch', 'nodemon'], function () {

    browserSync.init({
        server: {
            baseDir: "./client",
            middleware: [
                require('connect-history-api-fallback')({index: './index.html'})
            ]
        }
    });
});

gulp.task('express-server', ['ts-lint', 'js-lint', 'compile-ts', 'sass','nodemon', 'watch'], function () {
    browserSync.init({
        proxy: {
            target: "http://localhost:3000"
        },
        port: '5000'
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: './server/bin/www'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});


gulp.task('default', ['express-server']);
