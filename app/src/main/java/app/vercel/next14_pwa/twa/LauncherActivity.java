package app.vercel.next14_pwa.twa;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import com.google.android.gms.ads.identifier.AdvertisingIdClient;
import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LauncherActivity
        extends com.google.androidbrowserhelper.trusted.LauncherActivity {
    
    private static final String TAG = "LauncherActivity";
    private String advertisingId = null;
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private boolean isDestroyed = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d(TAG, "onCreate called");
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_USER_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }
        
        fetchAdvertisingId();
    }

    private void fetchAdvertisingId() {
        Log.d(TAG, "Fetching advertising ID");
        executor.execute(() -> {
            try {
                AdvertisingIdClient.Info adInfo = AdvertisingIdClient.getAdvertisingIdInfo(getApplicationContext());
                advertisingId = adInfo.getId();
                Log.d(TAG, "Advertising ID fetched: " + advertisingId);
            } catch (IOException | GooglePlayServicesNotAvailableException | GooglePlayServicesRepairableException e) {
                Log.e(TAG, "Error fetching advertising ID", e);
            } finally {
                runOnUiThread(this::launchTwa);
            }
        });
    }

    @Override
    protected void launchTwa() {
        if (!isDestroyed) {
            Log.d(TAG, "Launching TWA");
            Uri launchingUrl = getLaunchingUrl();
            Log.d(TAG, "Launching URL: " + launchingUrl);
            super.launchTwa();
        } else {
            Log.d(TAG, "Activity destroyed, not launching TWA");
        }
    }

    @Override
    protected Uri getLaunchingUrl() {
        Uri uri = super.getLaunchingUrl();
        Log.d(TAG, "Original launching URL: " + uri.toString());
        
        if (advertisingId != null && !advertisingId.isEmpty()) {
            uri = uri.buildUpon()
                    .appendQueryParameter("gps_adid", advertisingId)
                    .build();
            Log.d(TAG, "URL with GAID: " + uri.toString());
        } else {
            Log.d(TAG, "No GAID available to append");
        }
        
        return uri;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        isDestroyed = true;
        executor.shutdown();
        Log.d(TAG, "onDestroy called");
    }
}