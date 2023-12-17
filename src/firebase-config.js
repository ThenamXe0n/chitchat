// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBK2hN8f-saBmxBaRQF7evujeR4Rr10PCw",
  authDomain: "chitchat-c070b.firebaseapp.com",
  projectId: "chitchat-c070b",
  storageBucket: "chitchat-c070b.appspot.com",
  messagingSenderId: "50991319340",
  appId: "1:50991319340:web:5889d91d66aa8d354f4489",
  measurementId: "G-4X784CJQ9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
