const gulp = require('gulp');
const sass = require('gulp-sass');
const port = require('./config').PORT;
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const config = require('./config');
sass.compiler = require('node-sass');

const dir = {
    scss: './dev/scss/**/*.scss',
    css: './public/stylesheets/',
    hbs: './views/**/*.hbs',
    js: './dev/js/**/*.js',
    uglifiedJs: './public/javascript'
};



// Nodemon
gulp.task('start', function (done) {
    nodemon({
        script: 'app.js'
        , ext: 'js hbs html'
        , env: { 'NODE_ENV': config.IS_PRODUCTION }
        , done: done
    })
});

// uglify
gulp.task('uglify', () => gulp.src(dir.js)
    .pipe(rename('scripts.min.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(dir.uglifiedJs))
);



// Gulp-sass
gulp.task('scss', () => gulp.src(dir.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(dir.css)));

console.log("!!!!SUCCESS!!!!");


// 
gulp.task('default', gulp.parallel('scss', 'start', 'uglify', (done) => {
    gulp.watch(dir.scss, gulp.parallel('scss'));
    gulp.watch(dir.js, gulp.parallel('uglify'));
    done()
}));
