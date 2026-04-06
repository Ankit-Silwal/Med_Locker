// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firestore (database)
import { getFirestore } from "firebase/firestore";

// (Optional) Analytics — safe to keep
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDd3Lk_ZTHgkRXQhZbJUTf0-LAjKRgt33E",
  authDomain: "med-locker-4a793.firebaseapp.com",
  projectId: "med-locker-4a793",
  storageBucket: "med-locker-4a793.firebasestorage.app",
  messagingSenderId: "142488324679",
  appId: "1:142488324679:web:9a1cb219dacad936307f62",
  measurementId: "G-CF5K1LQF68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore ✅ (VERY IMPORTANT)
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);