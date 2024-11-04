// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMlnpxj-oFPSdPL3Hg_u5I26bfSEppBuM",
  authDomain: "testbackend-fm.firebaseapp.com",
  projectId: "testbackend-fm",
  storageBucket: "testbackend-fm.appspot.com",
  messagingSenderId: "900959139350",
  appId: "1:900959139350:web:523caa09cf941999032737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firestore
const db = getFirestore(app);
// Inicializa Firebase Storage
const storage = getStorage(app, "gs://testbackend-fm.firebasestorage.app");

//Especificamos los servicios que queremos ocupar

//Firestore database
export { db, storage };
