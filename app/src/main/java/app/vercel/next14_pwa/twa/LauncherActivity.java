package app.vercel.next14_pwa.twa;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;

public class LauncherActivity
        extends com.google.androidbrowserhelper.trusted.LauncherActivity {

    private static final String TAG = "LauncherActivity";
    private String gaid = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }

        // Fetch GAID
        fetchGAID();
    }

    private void fetchGAID() {
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Future<String> gaidFuture = executorService.submit(() -> getGAID());

        try {
            gaid = gaidFuture.get();  // Waits for GAID task
            if (gaid == null) {
                Log.w(TAG, "Failed to retrieve GAID");
            }
        } catch (Exception e) {
            Log.e(TAG, "Error fetching GAID", e);
        } finally {
            executorService.shutdown();
        }
    }

    private String getGAID() {
        try {
            return AdvertisingIdClient.getAdvertisingIdInfo(this).getId();
        } catch (Exception e) {
            Log.e(TAG, "Error retrieving GAID", e);
            return null;
        }
    }

    @Override
    protected Uri getLaunchingUrl() {
        // Get the original launch Url.
        Uri uri = super.getLaunchingUrl();
        
        // Append GAID as a query parameter if available
        if (gaid != null) {
            Uri.Builder builder = uri.buildUpon();
            builder.appendQueryParameter("ga_id", gaid);
            return builder.build();
        }
        
        return uri;
    }
}