// potentially a temporary file until I expand the orm's capabilities

const connection = require('./connection');

let customQueries = {
  getMessageThreadMetaData: (leagueId, cb) => {
    let queryString = 'Select mb.title, mb.topic_id As topicId, u.user_id As threadAuthorId, u.alias As threadAuthor, mb.created As threadCreated, lp.user_id As lastPostAuthorId, lp.alias As lastPostAuthor, lp.created As lastPostCreated, Count(mt.message_id) As postCount From message_board mb Inner Join message_thread mt On mb.topic_id = mt.topic_id Inner Join users u On mb.user_id = u.user_id Inner Join ( Select u.alias, u.user_id, mt.topic_id, Max(mt.created) As created From message_thread mt Inner Join users u On mt.user_id = u.user_id Group By u.alias, u.user_id, mt.topic_id ) lp On mb.topic_id = lp.topic_id Where mb.league_id = ' + leagueId + ' Group By mb.title, mb.topic_id, u.user_id, u.alias, mb.created, lp.user_id, lp.alias, lp.created';

    let query = connection.query(queryString, (err, result) => {
      cb(err, result);
    });
  }
}

module.exports = customQueries;