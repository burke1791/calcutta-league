const orm = require('../config/orm');

let league = {
  // cascading create queries to the following tables:
  // leagues
  // league_membership
  // league_settings
  // league_teams
  create: (leagueObj, cb) => {
    let queryParams = {
      table: 'leagues',
      data: leagueObj // keys must match column names
    };
    orm.insert(queryParams, cb);
  },

  createMembership: (membershipObj, cb) => {
    let queryParams = {
      table: 'league_membership',
      data: membershipObj
    };
    orm.insert(queryParams, cb);
  },

  createSettings: (settingsObj, cb) => {
    let queryParams = {
      table: 'league_settings',
      data: settingsObj
    };
    orm.insert(queryParams, cb);
  },

  populateTeams: (teamsObj, cb) => {
    let queryParams = {
      insertTable: 'league_teams',
      columns: '(league_id, team_id)',
      select: ['leagues.league_id', 'tournament_seeds.team_id'],
      fromTable: 'tournament_seeds',
      join: 'leagues',
      where: { 'leagues.league_id': teamsObj.league_id },
      and: { 'tournament_seeds.year': teamsObj.year }
    };
    orm.insertSelectJoinWhereAnd(queryParams, cb);
  }
}

module.exports = league;