// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmuf1G0Gj68-PX9UMg51FG7-1Z9-S6e9I",
  authDomain: "plateshare-5572e.firebaseapp.com",
  projectId: "plateshare-5572e",
  storageBucket: "plateshare-5572e.firebasestorage.app",
  messagingSenderId: "53637629607",
  appId: "1:53637629607:web:31bad866e212600b24bd82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
