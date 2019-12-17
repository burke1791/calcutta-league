import { NOTIF, API_POST, API_GET, API_PUT, AUCTION_STATUS } from './constants';
import Pubsub from './pubsub';

import axios from 'axios';
import AuthService, { User } from '../firebase/authService';
import { db, dbObj } from '../firebase/firebase';
import { formatMoney, formatDatestamp } from './helper';

var AdminService = {};

(function(obj) {

  obj.marchMadnessResults = {};

  obj.fetchMarchMadnessGames = (year) => {
    axios({
      method: 'GET',
      url: API_GET.admin_march_madness_results + year,
      headers: {
        token: User.idToken
      }
    }).then(response => {
      AdminService.marchMadnessResults = packageResults(JSON.parse(JSON.stringify(response.data)));
      Pubsub.publish(NOTIF.MM_RESULTS_DOWNLOADED);
    })
  }

  obj.sendGameResult = (year, round, gameId, scoreObj) => {
    axios({
      method: 'POST',
      url: API_POST.admin_march_madness_single_game,
      data: {
        year: year,
        gameId: gameId,
        round: round,
        team1: {
          id: scoreObj.team1Id,
          score: scoreObj.team1Score
        },
        team2: {
          id: scoreObj.team2Id,
          score: scoreObj.team2Score
        }
      },
      headers: {
        token: User.idToken
      }
    }).then(response => {
      console.log(response);
      Pubsub.publish(NOTIF.MM_SCORE_SET, gameId);
    })
  }
})(AdminService);

const packageResults = (results) => {
  function populateFromTeam1Results(key, game, result, seed) {
    game[key] = {
      name: result.team1_name,
      seed: seed,
      id: result.team1_id,
      score: result.team1_score
    };
  }

  function populateFromTeam2Results(key, game, result, seed) {
    game[key] = {
      name: result.team2_name,
      seed: seed,
      id: result.team2_id,
      score: result.team2_score
    };
  }

  if (results.length) {
    let packagedResults = results.map(result => {
      let game = {
        round: result.round_id,
        gameId: result.game_id,
        region: result.region_name
      };
  
      let team1Seed = Number(result.team1_seed.match(/\d{2}$/g)[0]);
      let team2Seed = Number(result.team2_seed.match(/\d{2}$/g)[0]);
  
      // stronger seed gets assigned to team1.  If they are equal then team1 goes to team1
      if (team1Seed < team2Seed) {
        populateFromTeam1Results('team1', game, result, team1Seed);
        populateFromTeam2Results('team2', game, result, team2Seed);
      } else if (team1Seed >= team2Seed) {
        populateFromTeam2Results('team1', game, result, team2Seed);
        populateFromTeam1Results('team2', game, result, team1Seed);
      } else {
        console.log('wtf happened to the seed values');
      }

      return game;
    });
  
    return packagedResults;
  }
  
  return null;
}

export default AdminService;