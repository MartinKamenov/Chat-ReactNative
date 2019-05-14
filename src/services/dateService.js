const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const dateService = {
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}.${monthsShort[date.getMonth()]}.${date.getFullYear()}`;
    }
};

export default dateService;