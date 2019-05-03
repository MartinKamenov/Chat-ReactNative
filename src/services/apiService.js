import constants from '../constants/constants';

const postData = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin'
};

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
        return fetch(url, postData);
    },

    registerUser: function(username, email, password) {
        if(!username || !email || !password) {
            return;
        }

        const query = `?username=${username}&password=${password}&email=${email}&password_confirm=${password}`;
        const url = constants.API_URL + constants.REGISTER_PATH + query;
        return fetch(url, postData);
    }
};

export default apiService;