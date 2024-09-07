import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNMJbg-PJbCRi-bNmqWnq6WV_EB42NnPc",
  authDomain: "umuome-security.firebaseapp.com",
  projectId: "umuome-security",
  storageBucket: "umuome-security.appspot.com",
  messagingSenderId: "121381879681",
  appId: "1:121381879681:web:78f33005f56e23e19df280",
  measurementId: "G-ECHG695MCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { storage, db, auth };
