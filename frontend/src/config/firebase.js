import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAtidSRjG5FoC7EjAVDaU0Sk93mE9wcz8Q",
    authDomain: "pugsod-storage.firebaseapp.com",
    projectId: "pugsod-storage",
    storageBucket: "pugsod-storage.appspot.com",
    messagingSenderId: "969196620039",
    appId: "1:969196620039:web:4a7b1e77e05d53278a1da2",
    measurementId: "G-JMLDWS48C1"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}