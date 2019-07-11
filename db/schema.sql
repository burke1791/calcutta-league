DROP DATABASE IF EXISTS calcutta;
CREATE DATABASE calcutta;

USE calcutta;
select 'create users - begin';
CREATE TABLE `users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `alias` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE users
  ADD CONSTRAINT unique_alias UNIQUE KEY(`alias`);
ALTER TABLE users
  ADD CONSTRAINT unique_email UNIQUE KEY(`email`);
select 'create users - end';

select 'create regions - begin';
CREATE TABLE `regions` (
  `year` YEAR(4) NOT NULL,
  `region_code` VARCHAR(1) NOT NULL,
  `region_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`year`, `region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create regions - end';

select 'create leagues - begin';
CREATE TABLE `leagues` (
  `league_id` INT(11) NOT NULL AUTO_INCREMENT,
  `league_name` VARCHAR(50) NOT NULL,
  `league_password` VARCHAR(50) NOT NULL,
  `league_year` YEAR(4) NOT NULL,
  `league_status` ENUM('complete', 'in-progress', 'auction', 'pre-auction') NOT NULL,
  PRIMARY KEY (`league_id`),
  FOREIGN KEY (`league_year`) REFERENCES `regions` (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create leagues - end';

select 'create league_settings - begin';
CREATE TABLE `league_settings` (
  `auction_id` VARCHAR(50) NOT NULL,
  `league_id` INT(11) NOT NULL,
  `max_buy_in` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  `min_buy_in` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  `murphy_tax` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  `min_bid` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  `interval` INT(2) NOT NULL DEFAULT 15,
  `unclaimed` ENUM('false', 'true') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`auction_id`, `league_id`),
  CONSTRAINT CHECK (`min_buy_in` <= `max_buy_in`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `league_settings` ADD CONSTRAINT
`fk_league_settings_leagues_league_id` FOREIGN KEY (`league_id`)
  REFERENCES `leagues` (`league_id`);
select 'create league_settings - end';

select 'create league_membership - begin';
CREATE TABLE `league_membership` (
  `user_id` INT(11) NOT NULL,
  `league_id` INT(11) NOT NULL,
  `role` ENUM('creator', 'admin', 'member', 'probation'),
  PRIMARY KEY (`user_id`, `league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `league_membership` ADD CONSTRAINT
`fk_league_membership_users_user_id` FOREIGN KEY (`user_id`)
  REFERENCES `users` (`user_id`);
ALTER TABLE `league_membership` ADD CONSTRAINT
`fk_league_membership_leagues_league_id` FOREIGN KEY (`league_id`)
  REFERENCES `leagues` (`league_id`);
select 'create league_membership - end';

select 'create teams - begin';
CREATE TABLE `teams` (
  `team_id` INT(11) NOT NULL AUTO_INCREMENT,
  `team_name` VARCHAR(50) NOT NULL,
  `team_conference` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create teams-end';

select 'create tournament_seeds - begin';
CREATE TABLE `tournament_seeds` (
  `team_id` INT(11) NOT NULL,
  `year` YEAR(4) NOT NULL,
  `region_code` VARCHAR(1) NOT NULL,
  `seed` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`team_id`, `year`),
  FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  FOREIGN KEY (`year`, `region_code`) REFERENCES `regions` (`year`, `region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create tournament_seeds - end';

select 'create league_teams - begin';
CREATE TABLE `league_teams` (
  `league_id` INT(11) NOT NULL,
  `team_id` INT(11) NOT NULL,
  `user_id` INT(11) NULL,
  `price` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  `return` FLOAT(8,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`league_id`, `team_id`),
  FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`),
  FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create league_teams - end';

select 'create auctions - begin';
CREATE TABLE `auctions` (
  `auction_id` VARCHAR(50) NOT NULL,
  `league_id` INT(11) NOT NULL,
  PRIMARY KEY (`auction_id`, `league_id`),
  FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create auctions - end';

select 'create tournament_slots - begin';
CREATE TABLE `tournament_slots` (
  `round_id` INT(1) NOT NULL,
  `game_id` VARCHAR(2) NOT NULL,
  `seed_strong` VARCHAR(4) NOT NULL,
  `seed_weak` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`round_id`, `game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create tournament_slots - end';

select 'create tournament_results - begin';
CREATE TABLE `tournament_results` (
  `round_id` INT(1) NOT NULL,
  `game_id` VARCHAR(2) NOT NULL,
  `year` YEAR(4) NOT NULL,
  `w_team_id` INT(11) NOT NULL,
  `w_team_score` INT(3) NOT NULL,
  `l_team_id` INT(11) NOT NULL,
  `l_team_score` INT(3) NOT NULL,
  PRIMARY KEY (`round_id`, `game_id`, `year`),
  FOREIGN KEY (`round_id`, `game_id`) REFERENCES `tournament_slots` (`round_id`, `game_id`),
  FOREIGN KEY (`w_team_id`) REFERENCES `teams` (`team_id`),
  FOREIGN KEY (`l_team_id`) REFERENCES `teams` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select 'create tournament_results - end';