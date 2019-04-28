import constants from '../constants/constants';
const apiService = {
    getMessagesFromMessenger: function(id) {
        const url = constants.API_URL + constants.MESSENGER_PATH + id;
        return fetch(url);
    }
};

export default apiService;