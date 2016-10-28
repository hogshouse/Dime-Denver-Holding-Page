// -----------------
// Define base folders
// -----------------
var src = 'src/';
var dest = 'build/';

// -----------------
// Call Plugins
// -----------------
var gulp          = require('gulp');
var connect       = require('gulp-connect');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');


gulp.task('connect', function () {
  connect.server({
    name: 'Dev App',
    root: ['./',],
    port: 8000,
    livereload: true
  });
});


gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// -----------------
// Gulp Sass Task - Affect any Sass Files here
// -----------------
gulp.task('sass', function() {
  gulp.src('./src/scss/**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: [
            'last 2 versions',
            'Chrome >= 35',
            'firefox >= 30',
            'Safari >= 7',
            'ie >=10',
            'Android >= 3'
            ],
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
})


gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
  gulp.watch(['./src/scss/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'connect', 'watch']);
