
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('mocha', () =>
  gulp.src(['test/**/*.spec.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }))
    .on(`error`, gutil.log)
);
