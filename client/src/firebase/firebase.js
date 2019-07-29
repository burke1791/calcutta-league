import firebase_config from './firebase.config.json';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const env = process.env.REACT_APP_ENV || 'development';

const config = firebase_config[env];

firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const dbObj = firebase.firestore;

export {
  auth,
  db,
  dbObj
};