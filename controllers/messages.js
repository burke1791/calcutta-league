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
  app.get('/api/message_board/topic/:topicId', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) { 
        console.log(error);
        res.json({
          message: 'ERROR!'
        });
      } else {
        let params = {
          uid: uid,
          topic_id: req.params.topicId
        };

        message.getAllMessagesInThread(params, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result)
            res.status(200).json(result);
          }
        })
      }
    });
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
            let messageObj = {
              league_id: req.body.leagueId,
              topic_id: result.insertId,
              content: req.body.content,
              uid: uid
            };
            
            message.postMessageInThread(messageObj, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result)
                res.status(200).json(result);
              }
            });
          }
        })
      }
    });
  });

  /**
   * posts a new message in a specific message thread
   */
  app.post('api/message_thread/new_message', (req, res, next) => {
    firebase.verifyToken(req.headers.token, (error, uid) => {
      if (error) {
        console.log(error);
        res.json({
          message: 'FIREBASE ERROR!'
        });
      } else {
        let messageObj = {
          league_id: req.body.leagueId,
          topic_id: req.body.topicId,
          content: req.body.content,
          uid: uid
        };

        message.postMessageInThread(messageObj, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.status(200).json(result);
          }
        });
      }
    });
  });
}