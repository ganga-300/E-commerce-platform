
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBqyyLQ45prZvnSN236vSRH3fIy67TpcBs",
  authDomain: "study-stuff-auth.firebaseapp.com",
  projectId: "study-stuff-auth",
  storageBucket: "study-stuff-auth.firebasestorage.app",
  messagingSenderId: "412335161954",
  appId: "1:412335161954:web:94915b82d8ff25fa9d473b",
  measurementId: "G-4HV02BW52G"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);