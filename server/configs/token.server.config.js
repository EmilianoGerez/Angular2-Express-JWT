module.exports = {
    SECRET_KEY: 'yoursecretkey',
    RESET_KEY: 'reset',
    ACTIVATE_KEY: 'activate',
    EXP_TIME: 1800, // in production you can use 30 min [1800]
    SESSION_TIME: 604800, // in production you can use one week [604800]
    RESET_TIME: 86400 // set 24hs
};