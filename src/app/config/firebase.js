import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD8jwurVBn8Ca-smHjgym6ZCoNh33xMOlo",
    authDomain: "revents-c4adf.firebaseapp.com",
    databaseURL: "https://revents-c4adf.firebaseio.com",
    projectId: "revents-c4adf",
    storageBucket: "revents-c4adf.appspot.com",
    messagingSenderId: "1020449794838",
    appId: "1:1020449794838:web:4f5341553d3e8680"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;