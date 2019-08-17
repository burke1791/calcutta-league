const auction = require('../models/auction');
const league = require('../models/league');
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

  // POST request stops the auction
  // verifies auth token with firebase then confirms that the user is authorized to stop the auctions
  app.post('/api/auction/stop', (req, res, next) => {
    let auctionId = req.body.auctionId;
    let userId = req.body.userId;
    let leagueId = req.body.leagueId;

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
            firebase.stopAuction(auctionId);
            res.status(200).json({
              message: 'Auction stopped'
            });
          }
        });
      }
    });
  });

  app.put('/api/auction/reset_clock', (req, res, next) => {
    let auctionId = req.body.auctionId;
    let userId = req.body.userId;
    let leagueId = req.body.leagueId;

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
            firebase.resetClock(auctionId).then(response => {
              res.status(200).end();
            });
          }
        });
      }
    });
  });

  app.put('/api/auction/next_item', (req, res, next) => {
    let auctionId = req.body.auctionId;
    let userId = req.body.userId;
    let leagueId = req.body.leagueId;
    let nextTeam = req.body.team;

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
            // get user_id and price from firebase then update MySQL
            console.log(auctionId);
            firebase.getSoldItemInfo(auctionId).then(response => {
              let teamObj = {
                user_id: response.user_id,
                team_id: response.team_id,
                price: response.price,
                league_id: leagueId
              };
              // if nobody bid on the team, then do not try to update MySQL
              // skip straight to updating the auction node if firestore with the next team
              if (teamObj.user_id == 'n/a') {
                // update firebase with the next team up for auction
                firebase.nextItem(auctionId, nextTeam).then(function() {
                  res.status(200).end();
                });
              } else {
                league.updateTeamSale(teamObj, (err, rows) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // update firebase with the next team up for auction
                    firebase.nextItem(auctionId, nextTeam).then(function() {
                      res.status(200).end();
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}