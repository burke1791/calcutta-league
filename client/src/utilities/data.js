import { NOTIF, API_POST, API_GET, API_PUT, AUCTION_STATUS } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

import axios from 'axios';
import AuthService, { User } from '../firebase/authService';
import { db, dbObj } from '../firebase/firebase';
import { formatMoney, formatDatestamp } from './helper';

var DataService = {};

var League = {};
var Auction = {};
var Data = {};

(function (obj) {
  // sends a post request to create a league
  obj.createLeague = (params) => {
    // @TODO create a params validator
    // @TODO refactor out of being a promise
    return new Promise((resolve, reject) => {
      axios.post(API_POST.create_league, params).then(response => {
        console.log(response);
        Pubsub.publish(NOTIF.LEAGUE_JOINED);
      }).catch(error => {
        console.log(error);
      });
    });
  }

  // sends a post request to join a league
  obj.joinLeague = (params) => {
    axios.post(API_POST.join_league, params).then(response => {
      console.log(response);
      Pubsub.publish(NOTIF.LEAGUE_JOINED);
    }).catch(error => {
      console.log(error);
    });
  }

  obj.updateLeagueInfo = () => {
    axios({
      method: 'GET',
      url: API_GET.league_summaries,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      // copy the response to Data.leagues
      console.log(response);
      Data.leagues = JSON.parse(JSON.stringify(response.data));
      Pubsub.publish(NOTIF.LEAGUE_SUMMARIES_FETCHED);
    }).catch(error => {
      // something wrong with id token - default to signing the user out
      AuthService.signout();
      console.log(error);
    })
  }

  obj.getLeagueUserSummaries = (leagueId) => {
    axios({
      method: 'GET',
      url: API_GET.league_user_summaries + leagueId,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Data.leagueInfo = packageLeagueInfo(JSON.parse(JSON.stringify(response.data)));
      Pubsub.publish(NOTIF.LEAGUE_USER_SUMMARIES_FETCHED);
    }).catch(error => {
      console.log(error);
    });
  }

  obj.getMessageBoardTopics = (leagueId) => {
    axios({
      method: 'GET',
      url: API_GET.message_board_topics + leagueId,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Data.messageBoardTopics = packageMessageBoardTopics(JSON.parse(JSON.stringify(response.data)));
      Pubsub.publish(NOTIF.MESSAGE_BOARD_TOPICS_DOWNLOADED);
    }).catch(error => {
      console.log(error);
    });
  }

  obj.postNewMessageBoardTopic = (leagueId, title, content) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: API_POST.new_topic,
        data: {
          leagueId: leagueId,
          title: title,
          content: content
        },
        headers: {
          token: User.idToken
        }
      }).then(response => {
        console.log(response);
        resolve();
      }).catch(error => {
        reject('error posting new topic - implement proper error handling');
      });
    });
  }

  obj.downloadMessageThread = (topicId) => {
    axios({
      method: 'GET',
      url: API_GET.message_thread + topicId,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Data.messageThread = packageMessageThread(JSON.parse(JSON.stringify(response.data)));
      Pubsub.publish(NOTIF.MESSAGE_THREAD_DOWNLOADED);
    }).catch(error => {
      console.log(error);
    });
  }

  obj.postNewMessage = (leagueId, topicId, content) => {
    axios({
      method: 'POST',
      url: API_POST.new_message,
      data: {
        leagueId: leagueId,
        topicId: topicId,
        content: content
      },
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Pubsub.publish(NOTIF.NEW_MESSAGE_POSTED);
    }).catch(error => {
      console.log(error);
    })
  }

  obj.getAuctionTeams = (leagueId) => {
    axios({
      method: 'GET',
      url: API_GET.auction_teams + leagueId,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Data.auctionTeams = response.data;
      Pubsub.publish(NOTIF.AUCTION_TEAMS_DOWNLOADED, null);
    }).catch(error => {
      console.log(error);
    })
  }

  // searches through the array of users belonging to the current league and returns the alias matching the userId
  obj.getAlias = (userId) => {
    for (var userObj of Data.leagueInfo.users) {
      if (userObj.id == userId) {
        return userObj.name;
      }
    }
    return 'unknown';
  }

  obj.sendChatMessage = (params) => {
    let messageObj = {
      author: params.author,
      timestamp: dbObj.Timestamp.now(),
      content: params.content,
      user_id: params.user_id,
      uid: params.uid
    };
    console.log(params);
    db.collection('auction-chat').doc(params.auctionId).collection('messages').add(messageObj).then(docRef => {
      console.log(docRef);
    }).catch(error => {
      // @TODO send useful error back to client ui
      console.log(error);
    })
  }

  obj.startChatListener = (auctionId) => {
    if (auctionId) {
      Data.unsubscribeChat = db.collection('auction-chat').doc(auctionId).collection('messages').orderBy('timestamp').onSnapshot(collection => {
        Data.chatMessages = [];
        // @TODO only push new messages to array instead of creating a new one
        // this will be a huge bottleneck for lengthy chat threads
        collection.forEach(docSnapshot => {
          let message = docSnapshot.data();
          console.log(message.timestamp);
          Data.chatMessages.push({
            author: message.author,
            content: message.content,
            timestamp: message.timestamp.seconds * 1000,
            user_id: message.user_id,
            uid: message.uid
          });
        });
        Pubsub.publish(NOTIF.NEW_CHAT_MESSAGE, null);
      });
    } else {
      console.log('auctionId undefined');
    }
  }

  obj.killChatListener = () => {
    if (Data.unsubscribeChat) {
      Data.unsubscribeChat();
    }
  }

  // sets a listener on the auction node in cloud firestore and updates the global Auction object with new data when it comes in
  obj.startAuctionListener = (auctionId) => {
    if (auctionId) {
      Data.unsubscribeAuction = db.collection('auctions').doc(auctionId).onSnapshot(doc => {
        console.log(doc.data());
        let prevItem = Auction.currentItem ? Auction.currentItem.id : '';
        setNewAuctionData(doc.data());
        let currentItem = Auction.currentItem ? Auction.currentItem.id : '';
        console.log(Auction);
        Pubsub.publish(NOTIF.NEW_AUCTION_DATA, prevItem != currentItem);
      });
    } else {
      console.log('auctionId undefined');
    }
  }

  obj.killAuctionListener = () => {
    if (Data.unsubscribeAuction) {
      Data.unsubscribeAuction();
    }
  }

  obj.startAuction = (auctionId, leagueId) => {
    // first get the next unowned team
    let team = {};
    for (var teamObj of Data.auctionTeams) {
      // if user_id is null
      if (!teamObj.user_id) {
        team.id = teamObj.team_id;
        team.name = teamObj.team_name;
        team.seed = teamObj.seed.match(/\d{1,}/g)[0] || '';
        break;
      }
    }

    if (!team.id) {
      // @TODO add some sort of feedback for the admin that all teams have been purchased
      return;
    }

    let reqBody = {
      auctionId: auctionId,
      leagueId: leagueId,
      userId: User.user_id,
      team: team
    };

    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: API_POST.start_auction,
        data: reqBody,
        headers: {
          token: User.idToken
        }
      }).then(response => {
        // auction started
        // tells the "Start Auction" button in auctionAdmin to cancel the loading animation
        resolve();
      }).catch(error => {
        // ony error back is a 401 not authorized
        // tells the "Start Auction" button in auctionAdmin to cancel the loading animation
        reject();
      });
    });
  }

  obj.stopAuction = (auctionId, leagueId) => {
    let reqBody = {
      auctionId: auctionId,
      leagueId: leagueId,
      userId: User.user_id
    };

    return new Promise((resolve, reject) => {
      axios({
        method: 'POST',
        url: API_POST.stop_auction,
        data: reqBody,
        headers: {
          token: User.idToken
        }
      }).then(response => {
        // auction stopped
        // tells the "Stop Auction" button in auctionAdmin to cancel the loading animation
        resolve();
      }).catch(error => {
        // only error would be a 401 not authorized
        // tells the "Stop Auction" button in auctionAdmin to cancel the loading animation
        reject();
      });
    });
  }

  obj.nextItem = (auctionId, leagueId) => {
    let team = {};
    for (var teamObj of Data.auctionTeams) {
      // if user_id is null
      if (!teamObj.user_id && teamObj.team_id != Auction.currentItem.id) {
        team.id = teamObj.team_id;
        team.name = teamObj.team_name;
        team.seed = teamObj.seed.match(/\d{1,}/g)[0] || '';
        break;
      }
    }

    if (!team.id) {
      // @TODO add some sort of feedback for the admin that all teams have been purchased
      return;
    }

    let reqBody = {
      auctionId: auctionId,
      leagueId: leagueId,
      userId: User.user_id,
      team: team
    };

    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: API_PUT.next_item,
        data: reqBody,
        headers: {
          token: User.idToken
        }
      }).then(response => {
        // next item submitted
        // tells the "Next Item" button in auctionAdmin to cancel the loading animation
        resolve();
      }).catch(error => {
        // only error would be a 401 not authorized
        // tells the "Next Item" button in auctionAdmin to cancel the loading animation
        reject();
      });
    });
  }

  obj.resetClock = (auctionId, leagueId) => {
    let reqBody = {
      auctionId: auctionId,
      leagueId: leagueId,
      userId: User.user_id
    };

    return new Promise((resolve, reject) => {
      axios({
        method: 'PUT',
        url: API_PUT.reset_clock,
        data: reqBody,
        headers: {
          token: User.idToken
        }
      }).then(response => {
        resolve();
      }).catch(error => {
        reject();
      });
    });
  }

  obj.placeBid = (auctionId, bidValue) => {
    console.log('placing bid in:', auctionId, 'for:', bidValue);
    return new Promise((resolve, reject) => {
      let auctionRef = db.collection('auctions').doc(auctionId);
      db.runTransaction(transaction => {
        return transaction.get(auctionRef).then(auction => {
          let auctionObj = auction.data();
          let currentItemId = auctionObj.currentItem.id;

          // check if we are placing a valid bid
          if (auctionObj.currentBid >= bidValue && auctionObj.status == AUCTION_STATUS.IN_PROGRESS) {
            throw 'Bid is too low!';
          }

          auctionObj.currentBid = bidValue;
          auctionObj.currentWinner = User.user_id;
          auctionObj.endTime = dbObj.FieldValue.serverTimestamp();
          // if the bid history for the current item is undefined, start it as an empty array
          if (!auctionObj.bidHistory[currentItemId]) {
            auctionObj.bidHistory[currentItemId] = []
          }
          auctionObj.bidHistory[currentItemId].push({
            bid: bidValue,
            // timestamps are not currently supported inside arrays
            // timestamp: dbObj.FieldValue.serverTimestamp(),
            userId: User.user_id
          });

          transaction.update(auctionRef, auctionObj);
        });
      }).then(newAuction => {
        console.log(newAuction);
        resolve();
      }).catch(error => {
        console.log(error);
        reject(error);
      });
    });
  }

  // sets the status field in firestore to "item-complete"
  // this is a general function that all users in the league have access to because if I only give it to admins, then the countdown might go negative if the admin navigates away from the page as the timer crosses 0
  // in the future this would be completely server-side, but for now this is a workaround, if a bit unsecure
  obj.setItemComplete = (auctionId) => {
    db.collection('auctions').doc(auctionId).update({
      status: AUCTION_STATUS.ITEM_COMPLETE
    });
  }
})(DataService);

const packageLeagueInfo = (userSummaries) => {
  if (userSummaries.length) {
    let leagueInfo = {
      name: userSummaries[0].league_name,
      auctionId: userSummaries[0].auction_id,
      status: userSummaries[0].league_status,
      users: []
    };

    leagueInfo.users = userSummaries.map(user => {
      return {
        id: user.user_id,
        key: user.user_id,
        name: user.alias,
        buyIn: user.buyIn,
        payout: user.payout,
        return: user.payout - user.buyIn
      };
    });

    // sorts the users in descending order by their net return
    leagueInfo.users.sort(function (a, b) { return b.return - a.return });

    // adds a rank property to each user after being sorted
    // also formats the money value into a friendlier string representation
    leagueInfo.users.forEach((user, index) => {
      user.rank = index + 1
      user.buyInFormatted = formatMoney(user.buyIn || 0);
      user.payoutFormatted = formatMoney(user.payout || 0);
      user.returnFormatted = formatMoney(user.return || 0);
    });

    return leagueInfo;
  }

  return null;
}

const packageMessageBoardTopics = (topicArr) => {
  return topicArr.map(topicObj => {
    let threadObj = {
      topic: {
        id: topicObj.topicId,
        title: topicObj.title,
        author: topicObj.threadAuthor,
        authorId: topicObj.threadAuthorId
      },
      created: formatDatestamp(topicObj.threadCreated),
      lastPost: {
        author: topicObj.lastPostAuthor || 'n/a',
        authorId: topicObj.lastPostAuthorId,
        created: formatDatestamp(topicObj.lastPostCreated) || 0
      },
      postCount: topicObj.postCount || 0,
      key: topicObj.topicId
    };

    return threadObj;
  });
}

const packageMessageThread = (messages) => {
  return messages.map(messageObj => {
    let message = {
      authorId: messageObj.user_id,
      author: messageObj.alias,
      content: messageObj.content,
      messageId: messageObj.messageId,
      created: new Date(messageObj.created).toLocaleString()
    };

    return message;
  });
}

const setNewAuctionData = (auctionObj) => {
  Auction = auctionObj;
  console.log(auctionObj);
  if (Auction.endTime != 0) {
    Auction.endTime = Auction.endTime.seconds;
  }
}

export default DataService;

export {
  Data,
  League,
  Auction
}