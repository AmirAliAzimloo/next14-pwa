package app.vercel.next14_pwa.twa;


import android.annotation.SuppressLint;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import ir.metrix.analytics.MetrixAnalytics;
import ir.metrix.analytics.messaging.RevenueCurrency;

public class ReceiverActivity extends AppCompatActivity {

    private static final String KEY_SLUG = "slug";
    private static final String KEY_REVENUE = "revenue";
    private static final String KEY_CURRENCY = "currency";
    private static final String KEY_ID = "id";
    private static final String KEY_FIRST_NAME = "firstName";
    private static final String KEY_LAST_NAME = "lastName";
    private static final String KEY_EMAIL = "email";
    private static final String KEY_PHONE_NUMBER = "phoneNumber";

    private static final String NEW_EVENT = "ir.metrix.NewEvent";
    private static final String NEW_REVENUE = "ir.metrix.NewRevenue";
    private static final String USER_ATTRIBUTES = "ir.metrix.UserAttributes";
    private static final String USER_CUSTOM_ID = "ir.metrix.UserCustomId";

    @SuppressLint("MissingSuperCall")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        Intent intent = getIntent();
        Uri data = intent.getData();


        if (intent.getAction() != null) {
            switch (intent.getAction()) {
                case NEW_EVENT:
                    String slug = data.getQueryParameter(KEY_SLUG);
                    if (slug != null) {
                        MetrixAnalytics.newEvent(slug);
                    }
                    break;

                case NEW_REVENUE:
                    String revenueSlug = data.getQueryParameter(KEY_SLUG);
                    String revenueValue = data.getQueryParameter(KEY_REVENUE);
                    String currency = data.getQueryParameter(KEY_CURRENCY);

                    if (revenueSlug != null && revenueValue != null && currency != null) {
                        double revenue = Double.parseDouble(revenueValue);
                        MetrixAnalytics.newRevenue(revenueSlug, revenue, RevenueCurrency.valueOf(currency));
                    }
                    break;

                case USER_ATTRIBUTES:
                    String firstName = data.getQueryParameter(KEY_FIRST_NAME);
                    if (firstName != null && !firstName.isEmpty()) {
                        MetrixAnalytics.User.setFirstName(firstName);
                    }

                    String lastName = data.getQueryParameter(KEY_LAST_NAME);
                    if (lastName != null && !lastName.isEmpty()) {
                        MetrixAnalytics.User.setLastName(lastName);
                    }

                    String email = data.getQueryParameter(KEY_EMAIL);
                    if (email != null && !email.isEmpty()) {
                        MetrixAnalytics.User.setEmail(email);
                    }

                    String phoneNumber = data.getQueryParameter(KEY_PHONE_NUMBER);
                    if (phoneNumber != null && !phoneNumber.isEmpty()) {
                        MetrixAnalytics.User.setPhoneNumber(phoneNumber);
                    }

                    String yourValue = data.getQueryParameter("yourKey");
                    if (yourValue != null) {
                        MetrixAnalytics.User.setCustomAttribute("yourKey", yourValue);
                    }
                    break;

                case USER_CUSTOM_ID:
                    String id = data.getQueryParameter(KEY_ID);
                    if (id == null || id.isEmpty()) {
                        MetrixAnalytics.User.deleteUserCustomId();
                    } else {
                        MetrixAnalytics.User.setUserCustomId(id);
                    }
                    break;
            }
        }

        // In case you want to go back to the same screen
        finish();
    }
}
