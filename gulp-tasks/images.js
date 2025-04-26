const { dest, src } = require('gulp');
const imagemin = require('gulp-imagemin');

const images = () =>
    src('./src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .on('data', file => console.log(`Minified: ${file.relative} (saved ${file.stat.size} bytes)`))
        .pipe(dest('./docs/images'));

module.exports = images;