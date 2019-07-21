const user = require('../models/user');
const firebase = require('../models/firebase');

module.exports = function(app) {
  // =========== GET ROUTES ==============

  app.get('/api/current_user', (req, res, next) => {
    // @ TODO verify the token sent in the headers with the firebase admin SDK
    
    // @ TODO return all pertinent info needed for the currently authenticated user
      // league memberships
    console.log('tokenId');
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        user.selectUserInfo({ uid: uid }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    });
  });


  // =========== POST ROUTES ==============

  app.post('/api/create_user', (req, res, next) => {
    let params = {
      uid: req.body.uid,
      email: req.body.email,
      alias: req.body.alias
    };
    user.create(params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          user_id: result.insertId
        });
      }
    });
  });
}

// @TODO create validation functions for the request bodies