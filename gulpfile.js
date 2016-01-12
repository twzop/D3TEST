var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect');

    // Path Variables
 var   input = {
        'sass' : './sass/**/*.scss',
        'html' : './*.html',
        'js' : './js/**/*.js'
    },
    output = {
        'css' : './css/',
        'html' : './'
    };

// SASS Processing Task
gulp.task('sass', function() {
   return gulp.src(['./sass/base.scss'])
       .pipe(sass())
       .pipe(gulp.dest('./css'))
       .pipe(connect.reload());
});

gulp.task('js', function() {
   return gulp.src(['./js/**/*.js'])
       .pipe(connect.reload());
});

// HTML Parsing and Server Reload
gulp.task('html', function() {
   return gulp.src(['./**/*.html'])
       .pipe(connect.reload());
});

// Watchers
gulp.task('watch', function() {
   gulp.watch(['./**/*.html'], ['html']);
    gulp.watch(['./sass/**/*.scss'], ['sass']);
    gulp.watch(['./js/**/*.js'], ['js']);
});

// Initiate Server
gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 8000,
        livereload: true
    });
});

// Que Task
gulp.task('default', ['sass', 'js', 'html', 'watch', 'connect']);

