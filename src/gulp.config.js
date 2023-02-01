// Define some plugins!
var autoprefixer = require('autoprefixer');
var bourbon = require('bourbon').includePaths;
var browsersync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var mqpacker = require('css-mqpacker');
var neat = require('bourbon-neat').includePaths;
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sasslint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');

// Set asset paths.
var paths = {
 css: ['./*.css', '!*.min.css'],
 sass: 'assets/sass/**/*.scss',
};

/**
 * Run Sass through a linter.
 */
gulp.task('sass:lint', ['cssnano'], function() {
 gulp.src([
  'assets/sass/**/*.scss',
  '!assets/sass/base/_normalize.scss',
  '!assets/sass/utilities/animate/**/*.*',
  '!assets/sass/base/_sprites.scss'
 ])
 .pipe(sasslint())
 .pipe(sasslint.format())
 .pipe(sasslint.failOnError());
});

/**
 * Minify and optimize style.css.
 */
gulp.task('cssnano', ['postcss'], function() {
 return gulp.src('style.css')
 .pipe(plumber({ errorHandler: handleErrors }))
 .pipe(cssnano({ safe: true }))
 .pipe(rename('style.min.css'))
 .pipe(gulp.dest('./'))});

/**
 * Compile Sass and run stylesheet through PostCSS.
 */
gulp.task('postcss', ['clean:styles'], function() {
 return gulp.src('assets/sass/*.scss', paths.css)
 .pipe(plumber({ errorHandler: handleErrors }))
 .pipe(sourcemaps.init())
 .pipe(sass({
   includePaths: [].concat(bourbon, neat),
   errLogToConsole: true,
   outputStyle: 'expanded'
 }))
 .pipe(postcss([
   autoprefixer({ browsers: ['last 2 version'] }),
   mqpacker({ sort: true }),
 ]))
 .pipe(sourcemaps.write())
 .pipe(gulp.dest('./'))
 .pipe(browserSync.stream());
});

/**
 * Clean compiled files.
 */
gulp.task('clean:styles', function() {
 return del(['style.css', 'style.min.css'])
});

/**
 * Process tasks and reload browsers.
 */
gulp.task('watch', function() {
 var files = [
   paths.sass
 ];
 browserSync.init( files, {
   open: false,
   proxy: "foo-client.dev",
   watchOptions: { debounceDelay: 1000 }
 });
 gulp.watch(paths.sass, ['styles']);
});

/**
 * Handle errors.
 */
function handleErrors() {
 var args = Array.prototype.slice.call(arguments);
 notify.onError({
   title: 'Task Failed [<%= error.message %>',
   message: 'See console.',
   sound: 'Sosumi'
 }).apply(this, args);
 gutil.beep();
 this.emit('end');
}