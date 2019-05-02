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

        let data = {
            method: 'POST'
        };
        
        const query = `?username=${username}&password=${password}`;
        const url = constants.API_URL + constants.LOGIN_PATH + query;
        return fetch(url, data);
    },

    registerUser: function(username, email, password) {
        if(!username || !email || !password) {
            return;
        }

        let data = {
            method: 'POST'
        };

        const query = `?username=${username}&password=${password}&email=${email}&password_confirm=${password}`;
        const url = constants.API_URL + constants.REGISTER_PATH + query;
        return fetch(url, data);
    }
};

export default apiService;