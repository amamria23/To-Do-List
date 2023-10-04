// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXw73C-E0ksA5OYlZ_s5H3sCzeyW9xhp0",
  authDomain: "react-lv3.firebaseapp.com",
  projectId: "react-lv3",
  storageBucket: "react-lv3.appspot.com",
  messagingSenderId: "536701133334",
  appId: "1:536701133334:web:28f28eaaf1da8f42cd0b37",
  measurementId: "G-3YFBBVP0GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);