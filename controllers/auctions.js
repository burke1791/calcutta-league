const auction = require('../models/auction');
const league = require('../models/league');
const firebase = require('../models/firebase');

/**
 * @todo put the firebase verify token function into express middleware
 * @todo put the league verify admin function into express middleware
 * @todo send useful error messages back to the client
 */

module.exports = function(app) {

  // =============== GET ROUTES ===============

  /**
   * Returns an array of teams that are in the auction, including what they sold for and who bought them (if sold)
   */
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

  // =============== POST ROUTES ==============

  /**
   * Starts the auction after verifying the tokenId with firebase AND confirming the user sending the request is authorized to do so (i.e. role == 'admin' || role == 'creator')
   */
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
            let auctionStatus = {
              id: leagueId,
              status: 'auction'
            };
            league.updateAuctionStatus(auctionStatus, (err, result) => {
              console.log('auction status updated');
            });
            res.status(200).json({
              message: 'Auction started'
            });
          }
        });
      }
    });
  });

  /**
   * Stops the auction after verifying the tokenId with firebase AND confirming the user is authorized to do so (i.e. role == 'admin' || role == 'creator')
   */
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
            let auctionStatus = {
              id: leagueId,
              status: 'in-progress'
            };
            league.updateAuctionStatus(auctionStatus, (err, result) => {
              console.log('auction status updated');
            });
            res.status(200).json({
              message: 'Auction stopped'
            });
          }
        });
      }
    });
  });

  // =============== PUT ROUTES ==============

  /**
   * Confirms user authorization then resets the auction clock of a given item, even after the clock hits zero.
   */
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

  /**
   * Commits the sale of the current item and then starts the clock for the next auction item
   * @todo break this up - DRY!
   */
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