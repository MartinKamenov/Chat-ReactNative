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
            // credentials: 'same-origin',
            // mode: 'same-origin',
            // body: JSON.stringify({
            //   appoid: appo_id
            // }),
            // headers: {
            //   'Accept':       'application/json',
            //   'Content-Type': 'application/json',
            //   'X-CSRFToken':  cookie.load('csrftoken')
            // }
          }
        const query = `?username=${username}&password=${password}`;
        const url = constants.API_URL + constants.LOGIN_PATH + query;
        console.log(url);
        return fetch(url, data);
    }
};

export default apiService;