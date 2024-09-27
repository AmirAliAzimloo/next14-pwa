package app.vercel.next14_pwa.twa;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.ads.identifier.AdvertisingIdClient.Info;

import android.content.Intent; 

public class LauncherActivity extends com.google.androidbrowserhelper.trusted.LauncherActivity {

    private Uri launchingUri;  // To hold the updated URI once the ad ID is retrieved
    private boolean isAdIdReady = false;  // To track if ad ID is ready

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the orientation based on Android version
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }

        // Get the original launch URL
        launchingUri = super.getLaunchingUrl();

        // Retrieve the advertising ID asynchronously using AsyncTask
        new FetchAdvertisingIdTask().execute();
    }

    // AsyncTask to fetch Advertising ID in the background
    private class FetchAdvertisingIdTask extends AsyncTask<Void, Void, String> {

        @Override
        protected String doInBackground(Void... voids) {
            try {
                Info adInfo = AdvertisingIdClient.getAdvertisingIdInfo(getApplicationContext());
                if (adInfo != null) {
                    return adInfo.getId();  // Return the Advertising ID
                }
            } catch (Exception e) {
                e.printStackTrace();  // Handle exceptions silently
            }
            return null;  // Return null if there's an error
        }

        @Override
        protected void onPostExecute(String advertisingId) {
            if (advertisingId != null) {
                // Update the URI with the Advertising ID
                launchingUri = launchingUri.buildUpon()
                        .appendQueryParameter("ad_id", advertisingId)
                        .build();
                
                // Show a Toast when the Advertising ID is ready
                showAdIdReadyToast(advertisingId);
            }
            isAdIdReady = true;  // Mark that the Ad ID is ready

            // Call getLaunchingUrl() once the ad ID is ready
            onAdIdReady();
        }
    }

    // Method to handle what happens once the Advertising ID is ready
    private void onAdIdReady() {
        // Here you can perform any operations that depend on the updated URI.
        Uri updatedUri = getLaunchingUrl();
        
        // Now you can use the updated URI (launchingUri)
        // For example: continue the flow of launching the Trusted Web Activity, etc.
        launchTrustedWebActivity(updatedUri);
    }

    @Override
    protected Uri getLaunchingUrl() {
        // Return the URI, either the original or updated with the ad ID if ready
        return launchingUri != null ? launchingUri : super.getLaunchingUrl();
    }

    // Example function to launch Trusted Web Activity with updated URI
    private void launchTrustedWebActivity(Uri uri) {
        // You can now use the updated URI to launch the Trusted Web Activity or any other action
        // For demonstration purposes, just showing the URI in the Toast
        Toast.makeText(this, "Launching URI: " + uri.toString(), Toast.LENGTH_LONG).show();

        // Here you would actually launch the activity, for example:
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);
    }

    // Method to display a Toast when the Advertising ID is ready
    private void showAdIdReadyToast(String advertisingId) {
        Toast.makeText(this, "Advertising ID ready: " + advertisingId, Toast.LENGTH_LONG).show();
    }
}
