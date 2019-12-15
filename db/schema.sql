# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: calcutta
# Generation Time: 2019-12-15 16:47:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table league_membership
# ------------------------------------------------------------

CREATE TABLE `league_membership` (
  `user_id` int(11) NOT NULL,
  `league_id` int(11) NOT NULL,
  `role` enum('creator','admin','member','probation') DEFAULT NULL,
  PRIMARY KEY (`user_id`,`league_id`),
  KEY `fk_league_membership_leagues_league_id` (`league_id`),
  CONSTRAINT `fk_league_membership_leagues_league_id` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`),
  CONSTRAINT `fk_league_membership_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table league_settings
# ------------------------------------------------------------

CREATE TABLE `league_settings` (
  `league_id` int(11) NOT NULL,
  `max_buy_in` float(8,2) NOT NULL DEFAULT '0.00',
  `min_buy_in` float(8,2) NOT NULL DEFAULT '0.00',
  `murphy_tax` float(8,2) NOT NULL DEFAULT '0.00',
  `min_bid` float(8,2) NOT NULL DEFAULT '0.00',
  `interval` int(2) NOT NULL DEFAULT '15',
  `unclaimed` enum('false','true') NOT NULL DEFAULT 'false',
  PRIMARY KEY (`league_id`),
  CONSTRAINT `fk_league_settings_leagues_league_id` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table league_teams
# ------------------------------------------------------------

CREATE TABLE `league_teams` (
  `league_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `price` float(8,2) NOT NULL DEFAULT '0.00',
  `return` float(8,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`league_id`,`team_id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `league_teams_ibfk_1` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`),
  CONSTRAINT `league_teams_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  CONSTRAINT `league_teams_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table leagues
# ------------------------------------------------------------

CREATE TABLE `leagues` (
  `league_id` int(11) NOT NULL AUTO_INCREMENT,
  `league_name` varchar(50) NOT NULL,
  `league_password` varchar(50) NOT NULL,
  `league_year` year(4) NOT NULL,
  `league_status` enum('complete','in-progress','auction','pre-auction') NOT NULL,
  `auction_id` varchar(50) NOT NULL,
  PRIMARY KEY (`league_id`),
  KEY `league_year` (`league_year`),
  CONSTRAINT `leagues_ibfk_1` FOREIGN KEY (`league_year`) REFERENCES `regions` (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table message_board
# ------------------------------------------------------------

CREATE TABLE `message_board` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT,
  `league_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL DEFAULT 'A Provocative Title',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`topic_id`),
  KEY `league_id` (`league_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `message_board_ibfk_1` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`league_id`),
  CONSTRAINT `message_board_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table message_thread
# ------------------------------------------------------------

CREATE TABLE `message_thread` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `topic_id` (`topic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `message_thread_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `message_board` (`topic_id`),
  CONSTRAINT `message_thread_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table regions
# ------------------------------------------------------------

CREATE TABLE `regions` (
  `year` year(4) NOT NULL,
  `region_code` varchar(1) NOT NULL,
  `region_name` varchar(50) NOT NULL,
  PRIMARY KEY (`year`,`region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table teams
# ------------------------------------------------------------

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(50) NOT NULL,
  `team_conference` varchar(50) NOT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tournament_results
# ------------------------------------------------------------

CREATE TABLE `tournament_results` (
  `round_id` int(1) NOT NULL,
  `game_id` varchar(2) NOT NULL,
  `year` year(4) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team1_score` int(3) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team2_score` int(3) DEFAULT NULL,
  `next_round` int(1) DEFAULT NULL,
  `next_game` varchar(2) DEFAULT '',
  PRIMARY KEY (`round_id`,`game_id`,`year`),
  KEY `team1Id` (`team1Id`),
  KEY `team2Id` (`team2Id`),
  CONSTRAINT `tournament_results_ibfk_1` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`team_id`),
  CONSTRAINT `tournament_results_ibfk_2` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tournament_seeds
# ------------------------------------------------------------

CREATE TABLE `tournament_seeds` (
  `team_id` int(11) NOT NULL,
  `year` year(4) NOT NULL,
  `region_code` varchar(1) NOT NULL,
  `seed` varchar(4) NOT NULL,
  `first_game_id` varchar(2) NOT NULL,
  PRIMARY KEY (`team_id`,`year`),
  KEY `year` (`year`,`region_code`),
  CONSTRAINT `tournament_seeds_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`),
  CONSTRAINT `tournament_seeds_ibfk_2` FOREIGN KEY (`year`, `region_code`) REFERENCES `regions` (`year`, `region_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `email` varchar(75) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `permissions` enum('herald','radiant','squire') NOT NULL DEFAULT 'squire',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
