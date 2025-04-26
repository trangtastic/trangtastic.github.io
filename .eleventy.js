const fs = require('fs');
const path = require('path');

module.exports = (config) => {

    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');

    // Custom collection to read photos
    config.addCollection('photosList', () => {
        const imageDir = path.join(__dirname, './src/images/photos');
        return fs
            .readdirSync(imageDir)
            .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));
    });

    // Filter and sort `next.items` by date
    config.addFilter('upcomingEvents', (items) => {
        const today = new Date();

        return items.flatMap(item =>
            item.dates.map(date => ({
                ...item,
                date,
                dateObj: new Date(date.split('.').reverse().join('-'))
            }))
        )
            .filter(item => item.dateObj >= today) // Remove past events
            .sort((a, b) => a.dateObj - b.dateObj); // Sort ascending
    });



    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'docs',
        },
        serverOptions: {
            port: 8080,
            host: "0.0.0.0",
        },
    };
};
