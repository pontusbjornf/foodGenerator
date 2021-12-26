
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlfPEDlw1ltXf0UQ7h9MyHm2Exzpx0pms",
  authDomain: "foodgeneratordb.firebaseapp.com",
  projectId: "foodgeneratordb",
  storageBucket: "foodgeneratordb.appspot.com",
  messagingSenderId: "779132111138",
  appId: "1:779132111138:web:07478c494da2ac68eafd7b",
  measurementId: "G-R1RFDK4JZP"
};

const app = initializeApp(firebaseConfig);
  
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });