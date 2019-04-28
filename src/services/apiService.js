import constants from '../constants/constants';
const apiService = {
    getMessagesFromMessenger: function(id) {
        console.log(id);
        return fetch(constants.API_URL + constants.MESSENGER_PATH + id);
    }
};

export default apiService;