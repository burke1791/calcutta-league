const league = require('../models/league.js');

module.exports = function(app) {
  // =============== GET ROUTES ===============


  // =============== POST ROUTES ==============
  
  app.post('/api/create_league', (req, res, next) => {
    let params = {
      league_name: req.body.name,
      league_password: req.body.password,
      league_year: req.body.year,
      league_status: 'pre-auction'
    };
    league.create(params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          league_id: result.insertId
        });
      }
    });
  });
}

// @TODO create validation functions for the request bodies