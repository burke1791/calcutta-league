const admin = require('firebase-admin');

const env = process.env.APP_ENV === 'prod' ? 'prod' : 'dev';

const serviceAccount = require('../secret/firebase-admin.json')[env];
const dbUrl = require('../config/config').firebase.dbUrl;

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