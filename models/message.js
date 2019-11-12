const orm = require('../config/orm');
const customQueries = require('../config/customQueries');

let message = {
  getTopicsByLeagueId: (messageObj, cb) => {
    // let queryParams = {
    //   table: 'message_board',
    //   columns: ['message_board.topic_id', 'message_board.league_id', 'message_board.user_id', 'message_board.title', 'message_board.created'],
    //   where: [
    //     { 'message_board.league_id': messageObj.league_id }
    //   ]
    // };
    // orm.select(queryParams, cb);

    customQueries.getMessageThreadMetaData(messageObj.league_id, cb);
  }
};

module.exports = message;