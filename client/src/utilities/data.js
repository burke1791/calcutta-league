import { NOTIF, API_POST, API_GET } from '../utilities/constants';
import Pubsub from '../utilities/pubsub';

import axios from 'axios';

var DataService = {};

var Data = {};

(function(obj) {
  // sends a post request to create a league
  obj.createLeague = (params) => {
    // @TODO create a params validator
    return new Promise((resolve, reject) => {
      axios.post(API_POST.create_league, params).then(response => {
        console.log(response);
        Pubsub.publish(NOTIF.LEAGUE_JOINED);
      }).catch(error => {
        console.log(error);
      });
    });
  }
})(DataService);

export default DataService;

export {
  Data
}