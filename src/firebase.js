import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyChUk_8ND79NmYYUWf_j-iKTgum8oRzY4o",
    authDomain: "chatify-e6d61.firebaseapp.com",
    projectId: "chatify-e6d61",
    storageBucket: "chatify-e6d61.appspot.com",
    messagingSenderId: "635295384107",
    appId: "1:635295384107:web:8ba78feb6c37192ac2606e"
};

// // // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

