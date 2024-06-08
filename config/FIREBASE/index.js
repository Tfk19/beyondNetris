import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
    apiKey: "AIzaSyCvriPv9gkYec9g3DvmxBqh-hHCJCTKhY8",
    authDomain: "beyondnetris-2e288.firebaseapp.com",
    projectId: "beyondnetris-2e288",
    storageBucket: "beyondnetris-2e288.appspot.com",
    messagingSenderId: "1051077403988",
    appId: "1:1051077403988:web:dd0eba519639be6c7fd4c1"
});

const FIREBASE = firebase;
export default FIREBASE;

