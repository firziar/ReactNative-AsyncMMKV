import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGRwYtGEaetxW-SRcC-V3lcGUmBlpOzPc",
  authDomain: "fir-auth-72281.firebaseapp.com",
  projectId: "fir-auth-72281",
  storageBucket: "fir-auth-72281.firebasestorage.app",
  messagingSenderId: "498610165636",
  appId: "1:498610165636:web:991acb8a7fc6afd92cafd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
