// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARqfxUTBB628078_J-HC7R-DSRbA61vL8",
  authDomain: "flyingsaucer-4368d.firebaseapp.com",
  projectId: "flyingsaucer-4368d",
  storageBucket: "flyingsaucer-4368d.firebasestorage.app",
  messagingSenderId: "506359621703",
  appId: "1:506359621703:web:870b0b4a39975e74556962",
  measurementId: "G-QTY1CJ2CT2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Function for Google Sign-In
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  return {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
};
