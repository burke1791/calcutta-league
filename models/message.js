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
  },

  getAllMessagesInThread: (threadObj, cb) => {
    // threadObj.uid and threadObj.topic_id
    let queryParams = {
      table: 'message_thread',
      columns: ['users.alias', 'message_thread.user_id', 'message_thread.content', 'message_thread.created'],
      join: [
        {
          type: 'INNER',
          table: 'message_board',
          condition: [
            {
              left: 'message_thread.topic_id',
              right: 'message_board.topic_id'
            },
          ]
        },
        {
          type: 'INNER',
          table: 'league_membership',
          condition: [
            {
              left: 'message_board.league_id',
              right: 'league_membership.league_id'
            }
          ]
        },
        {
          type: 'INNER',
          table: 'users',
          condition: [
            {
              left: 'league_membership.user_id',
              right: 'users.user_id'
            }
          ]
        }
      ],
      where: [
        { 'users.uid': threadObj.uid },
        { 'message_board.topic_id': threadObj.topic_id }
      ]
    };

    orm.select(queryParams, cb);
  },

  postNewTopic: (topicObj, cb) => {
    // let queryParams = {
    //   table: 'message_board',
    //   data: topicObj
    // }
    
    //orm.insert(queryParams, cb);
    customQueries.insertNewMessageBoardTopic(topicObj, cb);
  },

  postMessageInThread: (messageObj, cb) => {
    // let queryParams = {
    //   table: 'message_thread',
    //   data: messageObj
    // }

    //orm.insert(queryParams, cb);
    // need to use a custom query for now because the orm.insert function doesn't support joins yet
    customQueries.insertNewMessageInThread(messageObj, cb);
  }
};

module.exports = message;