const user = require('../models/user');
const firebase = require('../models/firebase');

module.exports = function(app) {
  // =========== GET ROUTES ==============

  /**
   * Gets the authenticated user's info after verifying the client's firebase token
   */
  app.get('/api/current_user', (req, res, next) => {
    /**
     * @todo put firebase.verifyToken() in express middleware
     */
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

  /**
   * Inserts a new user record in the MySQL database after the client creates an account through the firebase client SDK
   * This will be vulnerable until it invokes the firebase verify token function
   */
  app.post('/api/create_user', (req, res, next) => {
    /**
     * @todo pass through the firebase verify middleware (once it gets put in middleware)
     */
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

/**
 * @todo create validation functions for the request bodies
 */