/////////CONTENTT OF FB FILE////////////////
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// Initialize Firebase
// Firebase storage reference

const AWEPFirebaseConfig = {
  apiKey: "AIzaSyDq_j8jmjQ-xRN25zsvw7YyZNpRxJFDZvA",
  authDomain: "teamawep-6eff2.firebaseapp.com",
  projectId: "teamawep-6eff2",
  storageBucket: "teamawep-6eff2.appspot.com",
  messagingSenderId: "93911136966",
  appId: "1:93911136966:web:e0b0151e5c7fc3b436b5c7",
  measurementId: "G-BJKQPFVYZD",
};



const app1 = initializeApp(AWEPFirebaseConfig);
const FB = getStorage(app1);
export default FB;
