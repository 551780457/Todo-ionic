package com.rensanning.cordova.zycallback;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;

public class ZYCallbackPlugin extends CordovaPlugin {
	 public static final String ACTION_LOGIN_CALLBACK = "callback_login";

	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
			Log.e("todo", action);
		if(ACTION_LOGIN_CALLBACK.equals(action)){

			cordova.getActivity().runOnUiThread(new Runnable() {
                            public void run() {
                                Toast.makeText(cordova.getActivity().getApplicationContext(), "rawArgs", Toast.LENGTH_LONG).show();
                                callbackContext.success(); // Thread-safe.
                            }
                        });
			return true;
		}
		 callbackContext.error(""); // Thread-safe.
		return false;
	}

}
