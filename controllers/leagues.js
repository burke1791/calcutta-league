const league = require('../models/league.js');
const firebase = require('../models/firebase');

/**
 * @todo move firebase verify token function into a separate file
 */
module.exports = function (app) {
  // =============== GET ROUTES ===============


  // =============== POST ROUTES ==============

  /**
   * this route does quite a bit:
   * creates auction node in firebase ->
   * inserts record in the leagues table (needs firebase guid) ->
   * inserts record in the league_membership table (needs new league_id) ->
   * inserts record in the league_settings table (needs new league_id) ->
   * populates the league_teams table with records of each team in the current tournament
   * 
   * @todo refactor to chain the promises with subsequent .thens instead of firing off everything in the promise resolve function.  Or perhaps use promise.all
   */
  app.post('/api/create_league', (req, res, next) => {
    let params = {
      league_name: req.body.name,
      league_password: req.body.password,
      league_year: req.body.year,
      league_status: 'pre-auction'
    };

    // call firebase to create the league and auction nodes before inserting into MySQL
    /**
     * @todo break these league calls out into their own functions
     * @todo look into making all of this a transaction so that if one operation fails, they all fail
     */
    firebase.createAuctionNode().then(auctionId => {
      params.auction_id = auctionId;
      console.log(params);

      league.create(params, (err, result) => {
        if (err) {
          /**
           * @todo send a useful error back to the client
           */
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
              /**
               * @todo send a useful error back to the client
               */
              console.log(err);
            } else {
              // create league settings table
              // all fields except the league_id are defaulted
              let settingsObj = {
                league_id: leagueMembership.league_id
              };
              league.createSettings(settingsObj, (err, result) => {
                if (err) {
                  /**
                   * @todo send a useful error back to the client
                   */
                  console.log(err);
                } else {
                  // populate the league_teams table with the teams in the current year's tournament
                  /**
                   * @todo do this conditionally based on whether or not this year's teams have been inserted in the first place (after selection sunday)
                   */
                  league.populateTeams({ league_id: leagueMembership.league_id, year: 2019 }, (err, result) => {
                    if (err) {
                      /**
                       * @todo send a useful error back to the client
                       */
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
      /**
       * @todo send a useful error back to the client
       */
      console.log(error);
    });
  });

  /**
   * Inserts records to join a user to a league
   * Requires a league name and password passed in the body of the http request
   * First checks is there is a league matching the name a password provided
   * Then it creates the membership record
   */
  app.post('/api/join_league', (req, res, next) => {
    let leagueInfo = {
      league_name: req.body.name,
      league_password: req.body.password
    };

    league.getLeagueIdByNameAndPassword(leagueInfo, (err, result) => {
      if (err) {
        /**
         * @todo send a useful error back to the client
         */
        console.log(err);
      } else {
        /**
         * @todo figure out what to do when there are duplicate league names and passwords
         */
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

  /**
   * After verifying the tokenId with firebase, it gets the user's summary information for each league they are a member of
   */
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

  /**
   * After verifying the tokenId with firebase, this route grabs the summary information for each user in a specific league
   */
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

/**
 * @todo create validation functions for the request bodies
 */