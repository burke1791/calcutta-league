const league = require('../models/league.js');
const firebase = require('../models/firebase');

// @TODO move firebase verify token function into a separate file
module.exports = function(app) {
  // =============== GET ROUTES ===============


  // =============== POST ROUTES ==============
  
  // this route does quite a bit:
  // creates auction node in firebase ->
  // inserts record in the leagues table (needs firebase guid) ->
  // inserts record in the league_membership table (needs new league_id) ->
  // inserts record in the league_settings table (needs new league_id) ->
  // populates the league_teams table with records of each team in the current tournament
  app.post('/api/create_league', (req, res, next) => {
    let params = {
      league_name: req.body.name,
      league_password: req.body.password,
      league_year: req.body.year,
      league_status: 'pre-auction'
    };

    // call firebase to create the league and auction nodes before inserting into MySQL
    // @TODO break these league calls out into their own functions
    firebase.createAuctionNode().then(auctionId => {
      params.auction_id = auctionId;
      console.log(params);

      league.create(params, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let leagueMembership = {
            user_id: req.body.user_id,
            league_id: result.insertId,
            role: 'creator'
          };
          // insert a league membership record
          league.createMembership(leagueMembership, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // create league settings table
              // all fields except the league_id are defaulted
              let settingsObj = {
                league_id: leagueMembership.league_id
              };
              league.createSettings(settingsObj, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  // populate the league_teams table with the teams in the current year's tournament
                  // @TODO do this conditionally based on whether or not this year's teams have been inserted in the first place (after selection sunday)
                  league.populateTeams({ league_id: leagueMembership.league_id, year: 2019 }, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // finally done with this ridiculous cascade of queries
                      res.status(200).json({
                        message: 'league created'
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }).catch(error => {
      console.log(error);
    });
  });

  app.post('/api/join_league', (req, res, next) => {
    let leagueInfo = {
      league_name: req.body.name,
      league_password: req.body.password
    };

    league.getLeagueIdByNameAndPassword(leagueInfo, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        // @TODO figure out what to do when there are duplicate league names and passwords
        let leagueMembership = {
          user_id: req.body.user_id,
          league_id: result[0].league_id,
          role: 'member'
        };
        league.createMembership(leagueMembership, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              message: 'league joined'
            });
          }
        });
      }
    });
  });

  app.get('/api/league_summaries', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        console.log('token verified');
        league.selectLeagueSummaries({ uid: uid }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(result);
          }
        });
      }
    })
  });

  app.get('/api/league_user_summaries/:leagueId', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        console.log('token verified');
        let leagueObj = {
          league_id: req.params.leagueId
        }
        league.selectLeagueUserSummaries(leagueObj, (err, result) => {
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

// @TODO create validation functions for the request bodies