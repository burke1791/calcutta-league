const message = require('../models/message');

module.exports = function(app) {
  // =============== GET ROUTES ===============

  // checks if the user is a member of the league by its leagueId,
  // then returns all of the topics in that league's message board
  /**
   * @todo verify the user's token with firebase then send the uid to model file
   */
  app.get('/api/message_board/all/:leagueId', (req, res, next) => {
    let params = {
      league_id: req.params.leagueId
    };
    message.getTopicsByLeagueId(params, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  });

  // checks if the user is a member of the league by its id (deduced via the topic id),
  // then returns all of the messages in that topic's thread
  /**
   * @todo verify the user's token with firebase then send the uid to model file
   */
  app.get('/api/message_board/topic/:topicId', (req, res, next) => {
    let params = {
      topic_id: req.params.topicId
    };
    // check if the user is allowed to access the topic thread
    res.end();
  });

  app.post('/api/message_board/new_topic', (req, res, next) => {
    console.log(req.body);

    res.end();
  })
}