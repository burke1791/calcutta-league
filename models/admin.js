const orm = require('../config/orm');

let admin = {
  getTournamentResults: (params, cb) => {
    let queryParams = {
      table: 'tournament_results',
      alias: 'tr',
      columns: ['tr.round_id', 'tr.game_id', 'r.region_name', 't.team_id', 't.team_name', 'ts.seed', 'tr.team1_score', 't2.team_id', 't2.team_name', 'ts2.seed', 'tr.team2_score'],
      columnNames: [null, null, null, 'team1_id', 'team1_name', 'team1_seed', null, 'team2_id', 'team2_name', 'team2_seed', null],
      join: [
        {
          type: 'Inner',
          table: 'teams',
          alias: 't',
          condition: [
            {
              left: 'tr.team1Id',
              right: 't.team_id'
            }
          ]
        },
        {
          type: 'Inner',
          table: 'teams',
          alias: 't2',
          condition: [
            {
              left: 'tr.team2Id',
              right: 't2.team_id'
            }
          ]
        },
        {
          type: 'Inner',
          table: 'tournament_seeds',
          alias: 'ts',
          condition: [
            {
              left: 't.team_id',
              right: 'ts.team_id'
            },
            {
              left: 'tr.year',
              right: 'ts.year'
            }
          ]
        },
        {
          type: 'Inner',
          table: 'tournament_seeds',
          alias: 'ts2',
          condition: [
            {
              left: 't2.team_id',
              right: 'ts2.team_id'
            },
            {
              left: 'tr.year',
              right: 'ts2.year'
            }
          ]
        },
        {
          type: 'Inner',
          table: 'regions',
          alias: 'r',
          condition: [
            {
              left: 'ts.region_code',
              right: 'r.region_code'
            },
            {
              left: 'tr.year',
              right: 'r.year'
            }
          ]
        },
        {
          type: 'Cross',
          table: 'users',
          alias: 'u'
        }
      ],
      where: [
        { 'tr.year': params.year },
        { 'u.permissions': 'herald' },
        { 'u.uid': params.uid }
      ]
    };

    orm.select(queryParams, cb);
  }

}

module.exports = admin;