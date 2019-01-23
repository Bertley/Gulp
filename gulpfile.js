var gulp = require('gulp'); 
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify'); 
const sass = require('gulp-sass'); 
const concat = require('gulp-concat'); 
const rename = require('gulp-rename'); 
const cache = require('gulp-cache'); 
const browserSync = require('browser-sync').create(); 

/*
    --Top level functions 
    gulp.task - define task 
    gulp.src - point to files to use 
    gulp.dest - points to folder to output 
    gulp.watch - wacth files and folders for changes
*/
// Copy Html 
gulp.task('copyHtml', async function(){
    gulp.src('src/template/*.html')
        .pipe(gulp.dest('dist'));
});

// Concatenate JS Files 
gulp.task('scripts', async function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}); 

// Compile Sass 
gulp.task('sass', async function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css')); 
}); 

// Minify Image 
gulp.task('images', async function() {
    gulp.src('src/images/*')
        .pipe(cache(imagemin({optimationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest('dist/img')); 
})

// Static Server 
gulp.task('browser-sync', async function() {
    browserSync.init({
        // proxy: 'localhost:3000', 
        server: {
            baseDir: "./dist"
        }, 
        browser: 'chrome'
    }); 
    gulp.watch('src/template/*.html', gulp.series('copyHtml')).on('change', browserSync.reload); 
    gulp.watch('src/sass/*.scss', gulp.series('sass')).on('change', browserSync.reload); 
    gulp.watch('src/js/*.js', gulp.series('scripts')).on('change', browserSync.reload);  
})

// Watch 
gulp.task('watch', async function() {
    // Watch .html files 
    gulp.watch('src/template/*.html', gulp.series('copyHtml'))
    // Watch .js files 
    gulp.watch('src/js/*.js', gulp.series('scripts')); 
    // Watch .scss files 
    gulp.watch('src/sass/*.scss', gulp.series('sass')); 
    // Watch image files 
    gulp.watch('src/images/*', gulp.series('images'));
}); 


gulp.task('default', gulp.series('copyHtml', 'scripts', 'sass', 'images', 'browser-sync', 'watch')); 

