import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6rCLWpVS9pqW8vc7-_TeP7sTfkXZhz_g",
    authDomain: "bom-delivery.firebaseapp.com",
    databaseURL: "https://bom-delivery.firebaseio.com",
    projectId: "bom-delivery",
    storageBucket: "bom-delivery.appspot.com",
    messagingSenderId: "92000871135",
    appId: "1:92000871135:web:5ef14997953c0a759dbf6a",
    measurementId: "G-VNXKTWX8CP"
  };


export const myFirebase = firebase.initializeApp(firebaseConfig);

const baseDb = myFirebase.firestore();
export const db = baseDb;

export const storage = firebase.storage();