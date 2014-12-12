var ZYCallbackPlugin = {

    call: function (msg, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ZYCallbackPlugin',
            'callback_login',
            [msg]
        );
    }
};


module.exports = ZYCallbackPlugin;