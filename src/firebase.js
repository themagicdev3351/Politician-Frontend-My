// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_cUwPNDvaR-2L-A_9BGYfr9FEYdmPp44",
  authDomain: "aapno-abhimanyu.firebaseapp.com",
  projectId: "aapno-abhimanyu",
  storageBucket: "aapno-abhimanyu.appspot.com",
  messagingSenderId: "225410619356",
  appId: "1:225410619356:web:a7ec82d6cbf8c8cfcd6119",
  measurementId: "G-1YGGSTJXEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)

// Initialize Firebase Cloud Messaging and get a reference to the service
export default app;