var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rsync = require('gulp-rsync'),
  concat  = require('gulp-concat'),
  rimraf = require('rimraf'),
  minifyHTML = require('gulp-minify-html'),
  sass = require('gulp-sass'),
  path = require('path');

gulp.task('clean', function (cb) {
  rimraf('build', cb);
});

gulp.task('sass', function () {
  gulp.src('sass/**/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('copy', function () {
  return gulp.src(['./*.png',
                   './favicon.ico',
                   './img/**/*',
                   './favicon/**/*',
                   './components/**/*',
                   './fonts/**/*',
                   './.htaccess'], {base: './'})
    .pipe(gulp.dest('build'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['sass', 'minify-html', 'copy'], function() {
  return true;
});
