const auction = require('../models/auction');
const firebase = require('../models/firebase');

module.exports = function(app) {
  // GET request returns an array of teams to be auctioned off
  app.get('/api/auction_teams/:leagueId', (req, res, next) => {
    let params = {
      league_id: req.params.leagueId
    };
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        console.log('token verified');
        auction.selectAuctionTeams(params, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    });
  });
}