const GetGoogleFonts = require('get-google-fonts');

const fonts = async () => {
    const instance = new GetGoogleFonts({
        outputDir: './docs/fonts',
        cssFile: './fonts.css',
    });

    return instance.download(
        'https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&display=swap'
    );

};

module.exports = fonts;
