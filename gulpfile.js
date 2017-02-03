const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');

gulp.task('mocha', () =>
  gulp.src(
    [ './test/test.config.js', 'test/**/*.spec.js' ],
    { read: false }
  )
    .pipe(mocha({ reporter: 'spec' }))
    .on(`error`, err => gutil.log(`Error: ${err.message}`))
);

gulp.task('lint', () =>
  gulp.src([ '**/*.js', '!node_modules/**/*' ])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
);

gulp.task('watch', [ 'lint', 'mocha' ], () =>
  gulp.watch(['**/*.js'], [ 'lint', 'mocha' ])
);
