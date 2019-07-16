const admin = require('firebase-admin');

const env = process.env.APP_ENV || 'dev';

const serviceAccount = require('../secret/firebase-admin.json')[env];
const dbUrl = process.env.FIREBASE_DB_URL;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl
});

// module.exports = function(app) {
//   app.get('/firebase/user/:uid', (req, res, next) => {
//     admin.auth().getUser(req.params.uid).then(user => {
//       console.log('retrieved user with firebase admin sdk');
//       res.json(user.toJSON());
//     });
//   });
// }

let firebase = {
  verifyToken: (tokenId, cb) => {
    admin.auth().verifyIdToken(tokenId).then(decodedToken => {
      cb(null, decodedToken.uid);
    }).catch(error => {
      console.log(error);
      cb(error, null);
    });
  }
}

module.exports = firebase;