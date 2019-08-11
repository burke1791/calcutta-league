const orm = require('../config/orm');

let auction = {
  selectAuctionTeams: (leagueObj, cb) => {
    let queryParams = {
      table: 'league_teams',
      columns: ['league_teams.team_id', 'league_teams.user_id', 'league_teams.price', 'league_teams.return', 'teams.team_name', 'teams.team_conference'],
      join: [
        {
          type: 'LEFT',
          table: 'teams',
          condition: [
            { left: 'league_teams.team_id', right: 'teams.team_id' }
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

/*
SELECT lt.team_id, lt.user_id, lt.price, lt.return, t.team_name, t.team_conference
FROM league_teams lt
LEFT JOIN teams t
ON lt.team_id = t.team_id
WHERE lt.league_id = 2;
*/