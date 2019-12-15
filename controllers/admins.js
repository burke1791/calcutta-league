const admin = require('../models/admin');
const firebase = require('../models/firebase');

module.exports = function(app) {

  /**
   * Gets the march madness games by year
   */
  app.get('/api/admin/march_madness_results/:year', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        let params = {
          uid: uid,
          year: req.params.year
        }
        admin.getTournamentResults(params, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    });
  })
}