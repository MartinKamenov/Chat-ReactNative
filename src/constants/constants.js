const constants = {
    DOMAIN: '192.168.43.181:5000',
    API_URL: `http://${this.DOMAIN}`,
    WS_URL: `ws://${this.DOMAIN}/messenger/`,
    MESSENGER_PATH: '/messenger/',
    LOGIN_PATH: '/auth/login',
    REGISTER_PATH: '/auth/register',
    LOGIN_SUCCESS_MESSAGE: 'Successfull login',
    REGISTER_SUCCESS_MESSAGE: 'Successfull register'
};

export default constants;