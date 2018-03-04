    let gulp = require('gulp'),
        sass = require('gulp-sass'),
        // cssnano = require('gulp-cssnano'),
        rename = require('gulp-rename'),
        watch = require('gulp-watch')
        scssLint = require('gulp-scss-lint'),
        scssLintStylish = require('gulp-scss-lint-stylish'),
        sourcemaps = require('gulp-sourcemaps');

    gulp.task('sass', function (){
    	return gulp.src(['sass/**/*.sass', 'sass/**/*.scss'])
        .pipe(sourcemaps.init())
    	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
    	.pipe(gulp.dest('css'))
    });

    gulp.task('css-libs', ['sass'],  function(){      
        return gulp.src('css/main.css')  
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css'));
    });

    gulp.task('watch', ['css-libs'], function () {
    	gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], ['sass']);
    });

    gulp.task('default', ['watch']); 