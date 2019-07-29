import { NOTIF, API_POST, API_GET } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

import axios from 'axios';
import AuthService, { User } from '../firebase/authService';
import { db, dbObj } from '../firebase/firebase';
import { formatMoney } from './helper';

var DataService = {};

var Data = {};

(function(obj) {
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
      Data.unsubscribe = db.collection('auction-chat').doc(auctionId).collection('messages').orderBy('timestamp').onSnapshot(collection => {
        Data.chatMessages = [];
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
    if (Data.unsubscribe) {
      Data.unsubscribe();
    }
  }
})(DataService);

const packageLeagueInfo = (userSummaries) => {
  if (userSummaries.length) {
    let leagueInfo = {
      name: userSummaries[0].league_name,
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
    leagueInfo.users.sort(function(a, b){ return b.return - a.return });

    // adds a rank property to each user after being sorted
    // also formats the money value into a friendlier string representation
    leagueInfo.users.forEach((user, index) => {
      user.rank = index + 1
      user.buyIn = formatMoney(user.buyIn || 0);
      user.payout = formatMoney(user.payout || 0);
      user.return = formatMoney(user.return || 0);
    });

    return leagueInfo;
  }
  
  return null;
}

export default DataService;

export {
  Data
}