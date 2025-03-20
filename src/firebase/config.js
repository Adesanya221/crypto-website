// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD87zUSq5tZCOg2mR9QPGDcjBM1HI45kKw",
  authDomain: "crypto-frontend-5bd9a.firebaseapp.com",
  projectId: "crypto-frontend-5bd9a",
  storageBucket: "crypto-frontend-5bd9a.appspot.com",
  messagingSenderId: "935493668827",
  appId: "1:935493668827:web:3dc7ab4be25c3bfa22f8f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 