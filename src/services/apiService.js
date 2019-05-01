import constants from '../constants/constants';
const apiService = {
    getMessagesFromMessenger: function(id) {
        const url = constants.API_URL + constants.MESSENGER_PATH + id;
        return fetch(url);
    },

    loginUser: function(username, password) {
        if(!username || !password) {
            return;
        }
        const query = `?username=${username}&password=${password}`;
        const url = constants.API_URL + constants.LOGIN_PATH + query;
        return fetch(url);
    }
};

export default apiService;