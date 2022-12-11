/* eslint-disable */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const app = initializeApp({
  apiKey: "AIzaSyB4M5htVbUrlakcoTI1BBxZ8PmNRR5cLN8",
  authDomain: "lista-zakupow-cca0b.firebaseapp.com",
  projectId: "lista-zakupow-cca0b",
  storageBucket: "lista-zakupow-cca0b.appspot.com",
  messagingSenderId: "1056747706154",
  appId: "1:1056747706154:web:61df158fcbbf4fcd86f053",
  measurementId: "G-GJKM4Z4741"
  });
  
const db = getFirestore(app)
