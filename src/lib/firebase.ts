import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBrRM6bSuI4b7xTzQpuf06fNXSgLqCPZfo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "arch-studio-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "arch-studio-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "arch-studio-app.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1096288243081",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1096288243081:web:a909612d7b6a0edcba2558",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ZH57CTN1D5"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
