package com.rensanning.cordova.zycallback;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;
import android.widget.Toast;

public class ZYCallbackPlugin extends CordovaPlugin {
	 public static final String ACTION_LOGIN_CALLBACK = "callback_login";
	 public static final String TAG = "ZYDevice";
	 public static final String PASSWORD_CRYPT_KEY = "96818968";

	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		if(ACTION_LOGIN_CALLBACK.equals(action)){

			cordova.getActivity().runOnUiThread(new Runnable() {
                            public void run() {
                                Toast.makeText(cordova.getActivity().getApplicationContext(), "rawArgs", Toast.LENGTH_LONG).show();
                                callbackContext.success(); // Thread-safe.
                            }
                        });
		} else if(action.equals("desEncrypt")) {
			String res = args.getString(0);
			Log.e(TAG,encrypt(res,PASSWORD_CRYPT_KEY));
			callbackContext.success(encrypt(res,PASSWORD_CRYPT_KEY));
		} else if(action.equals("desDecrypt")) {
			String res = args.getString(0);
			Log.e(TAG,decrypt(res,PASSWORD_CRYPT_KEY));
			callbackContext.success(decrypt(res,PASSWORD_CRYPT_KEY));
		} else {
			return false;
		}
		return true;
	}
	
	public String encrypt(String encryptString, String encryptKey) {  
	        SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");  
			try {
				 Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
				 cipher.init(Cipher.ENCRYPT_MODE, key);  
			     byte[] encryptedData = cipher.doFinal(encryptString.getBytes());  
			     return Base64.encode(encryptedData);  
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			} 
		}  
	    
		 public String decrypt(String decryptString, String decryptKey) {  
	        byte[] byteMi = Base64.decode(decryptString);    
	        SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");     
	        try {
	        	 Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");  
	             cipher.init(Cipher.DECRYPT_MODE, key);  
	             byte decryptedData[] = cipher.doFinal(byteMi);  
	            
	             return new String(decryptedData);  
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			} 

	    }  

}
