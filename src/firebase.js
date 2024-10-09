// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyB4NRHSbrr6fyIPET9uggwhKo29mrE2Chw",
  authDomain: "invocify-4cc5a.firebaseapp.com",
  projectId: "invocify-4cc5a",
  storageBucket: "invocify-4cc5a.appspot.com",
  messagingSenderId: "418652580767",
  appId: "1:418652580767:web:c02af6d70b3b659bb86baa",
  measurementId: "G-JVCM3HVRZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;