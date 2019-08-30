const message = require('../models/message');

module.exports = function(app) {
  // =============== GET ROUTES ===============

  // checks if the user is a member of the league by its leagueId, then returns all of the topics in that league's message board
  app.get('/api/message_board/all/:leagueId', (req, res, next) => {
    let params = {
      topic_id: req.params.leagueId
    };
    // check if user is allowed to access the message board of this league
    res.end();
  });

  // checks if the user is a member of the league by its id (deduced via the topic id), then returns all of the messages in that topic's thread
  app.get('/api/message_board/topic/:topicId', (req, res, next) => {
    let params = {
      topic_id: req.params.topicId
    };
    // check if the user is allowed to access the topic thread
    res.end();
  })
}