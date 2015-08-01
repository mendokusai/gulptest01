/* gulp tasks */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),

    input = {
      'sass': 'sources.scss/**/*.scss',
      'javascript': 'sources/javascript/**/*.js',
      'vendorjs': 'public/assets/javascript/vendor/**/*.js'
    },

    output = {
      'stylesheets': 'public/assets/stylesheets',
      'javascript': 'public/assets/javascript'
    };

// create a default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('jshint', function(){
  return gulp.src(input.javascript)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function(){
  return gulp.src(input.sass)
  .pipe(sourcemaps.init()) //process original sources
  .pipe(sass())
  .pipe(sourcemaps.write()) // add map to mod'd source.
  .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('build-js', function(){
  return gulp.src(input.javascript)
  .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output.javascript));
});

//configure files to watch and task to use on file
gulp.task('watch', function(){
  gulp.watch(input.javascript, ['jshint']);
  gulp.watch(input.sass, ['build-css']);
});