const { dest, src } = require('gulp');
const uglify = require('gulp-uglify');

const minifyJs = () => {
    return src('./src/js/*.js')
        .pipe(uglify())
        .pipe(dest('./docs/js'));
};

module.exports = minifyJs;