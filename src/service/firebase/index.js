import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyARylfNxYFM0wGHaVLc_j_Q7NxAxHY9YqA",
  authDomain: "learn-66d5a.firebaseapp.com",
  databaseURL: "https://learn-66d5a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learn-66d5a",
  storageBucket: "learn-66d5a.appspot.com",
  messagingSenderId: "913958878812",
  appId: "1:913958878812:web:a3d5f61df6415252207099",
  measurementId: "G-7SL0B4D9HB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const analytics = getAnalytics(app);
export const logEventFirebase = () => {
  // setUserProperties(analytics, { favorite_food: 'apples' });
  // logEvent(analytics, 'screen_view', {
  //   firebase_screen: 'Demo app', 
  //   firebase_screen_class: 'Demo app 2'
  // });
  const data = {
    name: 'Hieu'
  }
  return logEvent(analytics, 'video_views', data)
}
logEventFirebase();
export default db;
