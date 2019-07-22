import { NOTIF, API_POST, API_GET } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

import axios from 'axios';

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
})(DataService);

export default DataService;

export {
  Data
}