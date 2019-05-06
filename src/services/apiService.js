import constants from '../constants/constants';

const getData = {
    method: 'GET',
    credentials: 'same-origin',
    mode: 'same-origin'
};
const postData = {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const apiService = {
    getAllUsers: function() {
        const url = constants.API_URL + constants.USERS_PATH;
        return fetch(url);
    },
    getMessagesFromMessenger: function(id) {
        const url = constants.API_URL + constants.MESSENGER_PATH + id;
        return fetch(url, getData);
    },

    loginUser: function(username, password) {
        if(!username || !password) {
            return;
        }
        
        const query = `?username=${username}&password=${password}`;
        const url = constants.API_URL + constants.LOGIN_PATH + query;
        return fetch(url, postData);
    },

    registerUser: function(username, email, password, imageUrl) {
        if(!username || !email || !password || !imageUrl) {
            return;
        }

        const query = `?username=${username}&password=${password}&email=${email}&password_confirm=${password}`;
        let body = {};
        body = JSON.stringify({
            imageUrl
        });
        postData.body = body;
        
        const url = constants.API_URL + constants.REGISTER_PATH + query;
        return fetch(url, postData);
    }
};

export default apiService;