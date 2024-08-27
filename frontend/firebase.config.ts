// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCET6ltUpffy3Opw6wpFRxhxgVIoq5tQoc",
  authDomain: "web-auction-page.firebaseapp.com",
  projectId: "web-auction-page",
  storageBucket: "web-auction-page.appspot.com",
  messagingSenderId: "1029875869632",
  appId: "1:1029875869632:web:d274e7e79fdc016e794a25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};