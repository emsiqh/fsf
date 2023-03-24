import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDn57-9tH08RZkRtZs6laBPmxkMyUJC1S0",
    authDomain: "job-finding-8968f.firebaseapp.com",
    projectId: "job-finding-8968f",
    storageBucket: "job-finding-8968f.appspot.com",
    messagingSenderId: "732164621945",
    appId: "1:732164621945:web:da409f9c26eae630f976a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;