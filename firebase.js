// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKWoCliPzEGQHyCicun82QpTeWuic30x0",
  authDomain: "translation-app-b126c.firebaseapp.com",
  projectId: "translation-app-b126c",
  storageBucket: "translation-app-b126c.appspot.com",
  messagingSenderId: "698468239247",
  appId: "1:698468239247:web:26812348f4bf1301a4edfa",
  measurementId: "G-0Y7MZ1Y544",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, firebaseConfig };
