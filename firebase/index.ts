import { getApp, getApps, initializeApp } from "@firebase/app";
import { getMessaging, getToken, isSupported } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAC26BQeZF_ltbijuoAvQyUhCHPgdMZVHE",
  authDomain: "next14-pwa.firebaseapp.com",
  projectId: "next14-pwa",
  storageBucket: "next14-pwa.appspot.com",
  messagingSenderId: "902726592469",
  appId: "1:902726592469:web:035b30a6d5c42ab302ff5c",
};

const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    console.log('fcmMessaging =>',fcmMessaging)
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey:
          "BHzse_YL7mwpWikd291H0IuxiOhYt-Rel26r7V3Ca8Sv4cnpRlRDbCQryJ5mKO5tml3ylzNTJtJMgOiQxWG73zQ",
      });
      console.log('token =>',token);
      return token;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {app,messaging};
