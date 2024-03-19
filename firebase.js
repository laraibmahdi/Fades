// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'; // Correct import statement
import { getAuth } from '@firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGqdwWQzpWvGLP-zaFCq1cnY6jPE4EHxw",
  authDomain: "hair-486ae.firebaseapp.com",
  projectId: "hair-486ae",
  storageBucket: "hair-486ae.appspot.com",
  messagingSenderId: "476959662144",
  appId: "1:476959662144:web:3d3cf864d3634a4a3abfa5",
  measurementId: "G-R10YS1L15D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
export { auth, firestore }
