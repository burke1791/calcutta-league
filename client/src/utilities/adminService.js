import { NOTIF, API_POST, API_GET, API_PUT, AUCTION_STATUS } from './constants';
import Pubsub from './pubsub';

import axios from 'axios';
import AuthService, { User } from '../firebase/authService';
import { db, dbObj } from '../firebase/firebase';
import { formatMoney, formatDatestamp } from './helper';

var AdminService = {};

(function(obj) {

  obj.fetchMarchMadnessGames = (year) => {
    axios({
      method: 'GET',
      url: API_GET.admin_march_madness_results + year,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
    })
  }
})(AdminService);

export default AdminService;