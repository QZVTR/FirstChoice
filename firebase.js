// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpaGXvXnJx6FzLwnm76-JWpn1EyTGnSgI",
  authDomain: "firstchoice-7b63d.firebaseapp.com",
  projectId: "firstchoice-7b63d",
  storageBucket: "firstchoice-7b63d.appspot.com",
  messagingSenderId: "658845369809",
  appId: "1:658845369809:web:4d562e541baf3ab3a2ccf0",
  measurementId: "G-EMCH44MZK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app); 
export const storage = getStorage(app);

export default app;