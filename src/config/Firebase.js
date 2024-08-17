// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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

//Especificamos los servicios que queremos ocupar
//Firestore database
export const db = getFirestore(app);

