var ZYCallbackPlugin = {

    call: function (msg, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ZYCallbackPlugin',
            'callback_login',
            [msg]
        );
    },
    
   desEncrypt : function (msg, successCallback) {
        cordova.exec(
            successCallback,
             null,
            'ZYCallbackPlugin',
            'desEncrypt',
            [msg]
        );
    },
   
   desDecrypt : function (msg, successCallback) {
        cordova.exec(
            successCallback,
           	null,
            'ZYCallbackPlugin',
            'desDecrypt',
            [msg]
        );
    }
    
};

module.exports = ZYCallbackPlugin;