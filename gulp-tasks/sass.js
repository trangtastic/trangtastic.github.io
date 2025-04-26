const { dest, src } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sassProcessor = require('gulp-sass')(require('sass'));

const isProduction = process.env.NODE_ENV === 'production';
const criticalStyles = ['critical.scss', 'home.scss', 'page.scss', 'work-item.scss'];

const calculateOutput = ({ history }) => {
    let response = './docs/css';
    const sourceFileName = /[^(/|\\)]*$/.exec(history[0])[0];
    if (criticalStyles.includes(sourceFileName)) {
        response = './src/_includes/css';
    }
    return response;
};

const sass = () =>
    src('./src/scss/*.scss')
        .pipe(sassProcessor().on('error', sassProcessor.logError))
        .pipe(cleanCSS(isProduction ? { level: 2 } : {}))
        .pipe(dest(calculateOutput, { sourceMaps: !isProduction }));

module.exports = sass;