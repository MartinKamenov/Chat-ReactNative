const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const dateService = {
    formatDate: function(dateString) {
        const date = new Date(dateString);
        const dayOfTheMonth = (date.getDate() + '').padStart(2, '0');
        return `${dayOfTheMonth} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
    },
    formatTime: function(dateString) {
        const date = new Date(dateString);
        const hours = (date.getHours() + '').padStart(2, '0');
        const minutes = (date.getMinutes() + '').padStart(2, '0');
        return `${hours}:${minutes}`;
    }
};

export default dateService;