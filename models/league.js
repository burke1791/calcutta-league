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
  },

  getLeagueIdByNameAndPassword: (infoObj, cb) => {
    let queryParams = {
      select: ['leagues.league_id'],
      from: 'leagues',
      where: {
        columns: ['league_name', 'league_password'],
        values: [infoObj.league_name, infoObj.league_password]
      }
    };
    orm.selectWhere(queryParams, cb);
  },

  selectLeagueSummaries: (uid, cb) => {
    let queryParams = {
      table: 'league_membership',
      columns: ['users.user_id', 'leagues.league_id', 'leagues.league_name', 'leagues.league_status', 'leagues.auction_id', 'league_membership.role'],
      sum: ['league_teams.price', 'league_teams.return'],
      joinTable: ['users', 'league_teams', 'leagues'],
      joinCondition: [
        { 'users.uid': uid.uid },
        { 'league_teams.user_id': 'users.user_id' },
        { 'leagues.league_id': 'league_membership.league_id' }
      ],
      where: [
        { 'league_membership.league_id': 'leagues.league_id' },
        { 'league_membership.user_id': 'users.user_id' }
      ],
      group: ['leagues.league_id', 'users.user_id']
    }

    orm.selectJoinWhereGroup({ 'u.uid': uid.uid }, cb);
  },

  selectLeagueUserSummaries: (leagueObj, cb) => {
    let queryParams = {
      table: 'league_membership',
      columns: ['users.user_id', 'users.alias', 'leagues.league_name', 'leagues.auction_id', 'leagues.league_status'],
      sum: ['league_teams.price', 'league_teams.return'],
      sumAlias: ['buyIn', 'payout'],
      joinTable: ['users', 'leagues', 'league_teams'],
      joinCondition: [
        ['league_membership.user_id', 'users.user_id'],
        ['league_membership.league_id', 'leagues.league_id'],
        ['league_membership.league_id', 'league_teams.league_id', 'league_membership.user_id', 'league_teams.user_id']
      ],
      where: { 'league_membership.league_id': leagueObj.league_id },
      group: ['league_membership.user_id']
    };

    orm.selectJoinWhereGroupTest(queryParams, cb);
  },

  updateTeamSale: (teamObj, cb) => {
    let queryParams = {
      table: 'league_teams',
      set: [
        { 'league_teams.user_id': teamObj.user_id },
        { 'league_teams.price': teamObj.price }
      ],
      where: [
        { 'league_teams.team_id': teamObj.team_id },
        { 'league_teams.league_id': teamObj.league_id }
      ]
    };

    orm.update(queryParams, cb);
  }
}

module.exports = league;