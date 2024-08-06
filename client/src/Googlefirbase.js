// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8bxNUPXp_7OXtEGHFgaWvbp6cpw8P5Ac", //unique key
  authDomain: "realestate-dda5d.firebaseapp.com",
  projectId: "realestate-dda5d",
  storageBucket: "realestate-dda5d.appspot.com",
  messagingSenderId: "655477729847",
  appId: "1:655477729847:web:2af6e3d0dbbc4b02286db2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);





// This line imports the initializeApp function from the Firebase SDK, which is necessary to initialize a Firebase application.
// Firebase Configuration Object:


// const firebaseConfig = {
//   apiKey: "AIzaSyB8bxNUPXp_7OXtEGHFgaWvbp6cpw8P5Ac",
//   authDomain: "realestate-dda5d.firebaseapp.com",
//   projectId: "realestate-dda5d",
//   storageBucket: "realestate-dda5d.appspot.com",
//   messagingSenderId: "655477729847",
//   appId: "1:655477729847:web:2af6e3d0dbbc4b02286db2"
// };
// This object contains the configuration details for your Firebase project.
// apiKey: A unique key that authenticates requests associated with your Firebase project.
// authDomain: The domain where Firebase Authentication should redirect users after they sign in.
// projectId: The unique identifier for your Firebase project.
// storageBucket: The Google Cloud Storage bucket where files will be stored.
// messagingSenderId: The unique numerical value created when you enable Firebase Cloud Messaging.
// appId: The unique identifier for the Firebase application.


// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// This line calls the initializeApp function with the firebaseConfig object, initializing your Firebase application with the specified configuration.
// The initialized Firebase app instance is then exported so it can be used in other parts of your application.
// How It Fits in Your Project
// Setup: This code is typically placed in a separate file (e.g., firebase.js or firebaseConfig.js) to centralize the Firebase configuration and initialization.
// Usage: Once the Firebase app is initialized and exported, you can import it into other files to access Firebase services (e.g., Firestore, Authentication, Storage).