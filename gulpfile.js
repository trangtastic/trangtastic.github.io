const { parallel, watch, series } = require('gulp');
const gulp = require('gulp');

// Pull in each task
const fonts = require('./gulp-tasks/fonts.js');
const images = require('./gulp-tasks/images.js');
const sass = require('./gulp-tasks/sass.js');
const scripts = require('./gulp-tasks/scripts.js');

// Task to copy the CNAME file to the docs folder
const copyCNAME = () => {
    return gulp.src('./CNAME') // Path to your CNAME file
        .pipe(gulp.dest('./docs')); // Destination folder
};

// Task to copy the 404.html file to the docs folder
const copy404 = () => {
    return gulp.src('./404.html') // Path to your 404.html file
        .pipe(gulp.dest('./docs')); // Destination folder
};

// Watcher task for live reloading or file changes
const watcher = () => {
    watch('./src/scss/**/*.scss', { ignoreInitial: true }, sass);
    watch('./src/images/**/*', { ignoreInitial: true }, images);
    watch('./src/js/**/*.js', { ignoreInitial: true }, scripts);
    watch('./CNAME', { ignoreInitial: true }, copyCNAME); // Watch for changes in CNAME file
    watch('./404.html', { ignoreInitial: true }, copy404); // Watch for changes in 404.html file
};

// Default task (runs all necessary tasks)
exports.default = series(parallel(fonts, images, sass, scripts), parallel(copyCNAME, copy404));

// This is our watcher task that instructs gulp to watch directories and act accordingly
exports.watch = watcher;
