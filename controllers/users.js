const user = require('../models/user.js');

module.exports = function(app) {
  // =========== GET ROUTES ==============

  app.get('/api/current_user', (req, res, next) => {
    // @ TODO return all pertinent info needed for the currently authenticated user
      // league memberships
    
    res.json({
      message: 'api/current_user hit'
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