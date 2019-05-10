const DOMAIN = 'mkchat-api.herokuapp.com';

const constants = {
    API_URL: `http://${DOMAIN}`,
    WS_URL: `ws://${DOMAIN}/messenger/`,
    MESSENGER_PATH: '/messenger/',
    LOGIN_PATH: '/auth/login',
    REGISTER_PATH: '/auth/register',
    USERS_PATH: '/auth/users',
    LOGIN_SUCCESS_MESSAGE: 'Successfull login',
    REGISTER_SUCCESS_MESSAGE: 'Successfull register',
    TOAST_DUARTION: 5000,
    PRIMARY_COLOR: '#99004D',
    SECONDARY_COLOR: '#ffffff'
};

export default constants;