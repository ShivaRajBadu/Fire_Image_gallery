// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjPCWHC4PHg4WdtB8tBVHp0fBOBQsaiEk",
  authDomain: "fire-image-gallery-7f61c.firebaseapp.com",
  projectId: "fire-image-gallery-7f61c",
  storageBucket: "fire-image-gallery-7f61c.appspot.com",
  messagingSenderId: "961213378194",
  appId: "1:961213378194:web:8ab40d5911e1fc8119804b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const fireStore = getFirestore(app);
export const auth = getAuth(app);

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
};
