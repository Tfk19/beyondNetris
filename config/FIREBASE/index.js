import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
    apiKey: "AIzaSyDxUW3F6ltx6UmsrvLtQ9zpwlM0dpNM5iw",
    authDomain: "beyondnetris-85cee.firebaseapp.com",
    databaseURL: "https://beyondnetris-85cee-default-rtdb.firebaseio.com",
    projectId: "beyondnetris-85cee",
    storageBucket: "beyondnetris-85cee.appspot.com",
    messagingSenderId: "41108014716",
    appId: "1:41108014716:web:0785a5069ab9ad4c1a6bf9",
    measurementId: "G-C6D2XGTCSZ"
});

const FIREBASE = firebase;
export default FIREBASE;

