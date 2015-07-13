/*eslint-env node */
'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var lint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var react = require('gulp-react');

var paths = {
  src: './src',
  html: this.src + '/*.html',
  js: './src/js/*.js',
  jsx: './src/js/jsx/**/*.js'
};

gulp.task('connect', function () {
  connect.server({
    root: paths.src,
    port: 8000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(paths.html)
      .pipe(plumber())
      .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(paths.js)
      .pipe(plumber())
      .pipe(lint())
      .pipe(lint.formatEach())
      .pipe(connect.reload());
});

gulp.task('react', function () {
  return gulp.src(paths.jsx)
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest('./src/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([paths.html], ['html']);
  gulp.watch([paths.js], ['js']);
  gulp.watch([paths.jsx], ['react']);
});

gulp.task('default', ['connect', 'html', 'js', 'react', 'watch']);
