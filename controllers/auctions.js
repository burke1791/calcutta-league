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

  // POST request starts the auction
  // verifies auth token with firebase then confirms that the user is authorized to start the auction
  app.post('/api/auction/start', (req, res, next) => {
    let auctionId = req.body.auctionId;
    let userId = req.body.userId;
    let leagueId = req.body.leagueId;
    let team = req.body.team;

    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          message: 'Not authorized'
        });
      } else {
        console.log('token verified');
        let params = {
          league_id: leagueId,
          user_id: userId
        };
        auction.verifyAdmin(params, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log('admin confirmed');
            console.log(result);
            firebase.startAuction(auctionId, team);
            res.status(200).json({
              message: 'Auction started'
            });
          }
        });
      }
    });
  });
}