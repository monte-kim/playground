// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeX6bXGkkFapy3C3WVfJe4_-3NadfHWTI',
  authDomain: 'crwn-clothing-db-ff668.firebaseapp.com',
  projectId: 'crwn-clothing-db-ff668',
  storageBucket: 'crwn-clothing-db-ff668.appspot.com',
  messagingSenderId: '875768155039',
  appId: '1:875768155039:web:6b5e961ec76eaec64dcbaa',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
