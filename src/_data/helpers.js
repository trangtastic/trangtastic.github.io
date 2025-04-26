module.exports = {
    getLinkActiveState(itemUrl, pageUrl) {
        let response = '';

        if (itemUrl === pageUrl) {
            response = ' aria-current="page"';
        }

        if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
            response += ' data-state="active"';
        }

        return response;
    },

    getWeekday(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number);
        const date = new Date(year, month - 1, day);
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weekdays[date.getDay()];
    },
};
