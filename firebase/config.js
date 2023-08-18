// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

//const firebaseConfig = {
//  apiKey: "AIzaSyD0whclJ77bEneg0Ve57WEs4VSzDbjg4Ao",//process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
//};

const firebaseConfig = {
  apiKey: "AIzaSyD0whclJ77bEneg0Ve57WEs4VSzDbjg4Ao",
  authDomain: "openexa-portfolio.firebaseapp.com",
  databaseURL: "https://openexa-portfolio-default-rtdb.firebaseio.com",
  projectId: "openexa-portfolio",
  storageBucket: "openexa-portfolio.appspot.com",
  messagingSenderId: "436796344650",
  appId: "1:436796344650:web:e567a1adab4b9e3e7f59b3",
  measurementId: "G-419D1LEEPB"
};

// Initialize Firebase
//let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let firebase_app = initializeApp(firebaseConfig);

export default firebase_app;