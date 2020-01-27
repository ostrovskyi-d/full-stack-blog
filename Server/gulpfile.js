const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
sass.compiler = require('node-sass');


gulp.task('scss', () => {
    return gulp.src('./dev/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./public/stylesheets/'))
});


// works!
gulp.task('default',gulp.series('scss'), () => {
    gulp.watch('./dev/scss/**/*.scss', gulp.series('scss'));
});