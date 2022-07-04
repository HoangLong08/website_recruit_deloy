import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDnucm8AS2CdvSFqBUTrRpw2rCyEB41Do8',
  authDomain: 'website-recruit.firebaseapp.com',
  projectId: 'website-recruit',
  storageBucket: 'website-recruit.appspot.com',
  messagingSenderId: '1043756059906',
  appId: '1:1043756059906:web:2c96bcbe0610778bfd861b',
  measurementId: 'G-Y9VEPEGF0M'
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
