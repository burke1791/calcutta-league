const orm = require('../config/orm');

let auction = {
  selectAuctionTeams: (leagueObj, cb) => {
    let queryParams = {
      table: 'league_teams',
      columns: ['league_teams.team_id', 'league_teams.user_id', 'league_teams.price', 'league_teams.return', 'teams.team_name', 'teams.team_conference', 'tournament_seeds.seed'],
      join: [
        {
          type: 'LEFT',
          table: 'teams',
          condition: [
            { left: 'league_teams.team_id', right: 'teams.team_id' }
          ]
        },
        {
          type: 'LEFT',
          table: 'tournament_seeds',
          condition: [
            {left: 'league_teams.team_id', right: 'tournament_seeds.team_id'}
          ]
        }
      ],
      where: [
        {
          'league_teams.league_id': leagueObj.league_id
        }
      ]
    };

    orm.select(queryParams, cb);
  },

  verifyAdmin: (membershipObj, cb) => {
    let queryParams = {
      table: 'league_membership',
      columns: ['league_membership.role'],
      where: [
        {
          'league_membership.league_id': membershipObj.league_id
        },
        {
          'league_membership.user_id': membershipObj.user_id
        }
      ]
    };
    
    orm.select(queryParams, cb);
  }
};

module.exports = auction;