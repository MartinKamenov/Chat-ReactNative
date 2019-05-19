const DOMAIN = 'mkchat-api.herokuapp.com';

const constants = {
    API_URL: `http://${DOMAIN}`,
    WS_URL: `ws://${DOMAIN}/messenger/`,
    MESSENGER_PATH: '/messenger/',
    LOGIN_PATH: '/auth/login',
    REGISTER_PATH: '/auth/register',
    USERS_PATH: '/auth/users',
    LOGOUT_PATH: '/auth/logout',
    LOGIN_SUCCESS_MESSAGE: 'Successfull login',
    REGISTER_SUCCESS_MESSAGE: 'Successfull register',
    LOGOUT_SUCCESS_MESSAGE: 'Successfull logout',
    TOAST_DUARTION: 5000,
    PRIMARY_COLOR: '#31AF91',
    SECONDARY_COLOR: '#ffffff',
    DARKER_PRIMARY_COLOR: '#288770',
    OFFSET_INFINITE_SCROLL: 30
};

export default constants;