const message = require('../models/message');
const firebase = require('../models/firebase');

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

  /**
   * verifies token with firebase
   * verifies the user is a member of the league s/he's trying to post to
   * inserts the new topic and the first message into the database
   */
  app.post('/api/message_board/new_topic', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        let topicObj = {
          league_id: req.body.leagueId,
          title: req.body.title,
          uid: uid
        }
        message.postNewTopic(topicObj, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            console.log('Now insert the message in message_thread');
          }
        })
      }
    })

    res.end();
  })
}