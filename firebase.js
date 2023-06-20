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
  apiKey: "AIzaSyBiiwnP5rFL8nz2nUr5ykDPkxnbFkD8K40",
  authDomain: "firstchoice-bc61b.firebaseapp.com",
  projectId: "firstchoice-bc61b",
  storageBucket: "firstchoice-bc61b.appspot.com",
  messagingSenderId: "730421440295",
  appId: "1:730421440295:web:8d4edffe71ca945a324302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app); 
export const storage = getStorage(app);

export default app;