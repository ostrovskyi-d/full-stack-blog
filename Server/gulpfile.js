// const port = require('./config').PORT;

const concat = require('gulp-concat');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const config = require('./config');
sass.compiler = require('node-sass');

const dirs = {
    scss: './dev/scss/**/*.scss',
    hbs: './views/**/*.hbs',
    js: './dev/js/**/*.js',
    outerCSS: './public/stylesheets/',
    outerUglifiedJs: '/public/javascript',
    mediumEditor: 'node_modules/medium-editor/dist/js/medium-editor.min.js'
};


// Nodemon
gulp.task('start', function (done) {
    nodemon({
        script: 'app.js'
        , ext: 'js hbs html jsx'
        , env: {'NODE_ENV': config.IS_PRODUCTION}
        , done: done
    })
});

// uglify
gulp.task('uglify', () => gulp.src([dirs.js, dirs.mediumEditor])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascript'))
);

// Gulp-sass
gulp.task('scss', () => gulp.src(dirs.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(dirs.outerCSS)));

console.log("!!!!SUCCESS!!!!");


//
gulp.task('default', gulp.series('scss','uglify', 'start' , (done) => {
    gulp.watch(dirs.scss, gulp.parallel('scss'));
    gulp.watch(dirs.js, gulp.series('uglify'));

    done()
}));
