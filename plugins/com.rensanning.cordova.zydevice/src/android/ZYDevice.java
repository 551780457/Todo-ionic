package com.rensanning.cordova.zydevice;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;

public class ZYDevice extends CordovaPlugin {
	public static final String TAG = "ZYDevice";


	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equals("getZYDeviceInfo")) {
			JSONObject r = new JSONObject();
			r.put("uuid", this.getUuid());
			r.put("tel", this.getTel());
			callbackContext.success(r);
		} else {
			return false;
		}
		return true;
	}

	/**
	 * Get the device's Universally Unique Identifier (UUID).
	 *
	 * @return
	 */
	public String getUuid() {
		TelephonyManager telManager = (TelephonyManager) this.cordova
			.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
		String id = telManager.getDeviceId();
		if (id == null) {
			id = telManager.getSubscriberId();
		}
		if (id == null) {
			id = Secure.getString(this.cordova.getActivity()
					.getContentResolver(), Secure.ANDROID_ID);
		}
		return id;
	}
	
	/**
	 *  �ֻ�ţ�   GSM�ֻ�� MSISDN.   
	 * @return Return null if it is unavailable. 
	 */
	public String getTel() {
		TelephonyManager telManager = (TelephonyManager) this.cordova
			.getActivity().getSystemService(Context.TELEPHONY_SERVICE);
		String tel = telManager.getLine1Number();
		return tel;
	}

}
