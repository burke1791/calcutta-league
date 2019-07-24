const admin = require('firebase-admin');

const env = process.env.APP_ENV === 'prod' ? 'prod' : 'dev';

// const serviceAccount = require('../secret/firebase-admin.json')[env];
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};
const dbUrl = require('../config/config').firebase.dbUrl;

console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl
});

const db = admin.firestore();

let firebase = {
  verifyToken: (tokenId, cb) => {
    admin.auth().verifyIdToken(tokenId).then(decodedToken => {
      cb(null, decodedToken.uid);
    }).catch(error => {
      console.log(error);
      cb(error, null);
    });
  },

  createAuctionNode: (params) => {
    return new Promise((resolve, reject) => {
      db.collection('auctions').add({
        // test
        currentItem: {
          id: 1,
          name: 'Illinois'
        },
        status: 'in-progress',
        currentBid: 5,
        currentWinner: 4,
        endTime: 45,
        itemHistory: {
          '4': 5
        },
        completeHistory: {
          '0': {
            '3': 4,
            '5': 7
          }
        }
      }).then(docRef => {
        console.log(docRef.id);
        resolve(docRef.id);
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }
}

module.exports = firebase;