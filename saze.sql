#
# SQL Export
# Created by Querious (1055)
# Created: 2 December 2016 at 20:44:11 GMT+1
# Encoding: Unicode (UTF-8)
#


CREATE DATABASE IF NOT EXISTS `saze` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
USE `saze`;




SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `playlist_track`;
DROP TABLE IF EXISTS `track`;
DROP TABLE IF EXISTS `playlist`;
DROP TABLE IF EXISTS `user`;


CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `profile_picture` varchar(45) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_id1` (`id`) USING BTREE,
  UNIQUE KEY `idx_email` (`email`) USING BTREE,
  UNIQUE KEY `idx_username` (`username`) USING BTREE,
  UNIQUE KEY `idx_profile_picture` (`profile_picture`) USING BTREE,
  KEY `idx_id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;


CREATE TABLE `playlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `public` int(11) NOT NULL DEFAULT '1',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_id` (`id`) USING BTREE,
  UNIQUE KEY `idx_name_user_id` (`name`,`user_id`) USING BTREE,
  KEY `idx_id1` (`id`) USING BTREE,
  KEY `playlist_ibfk_1` (`user_id`),
  CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `artist` varchar(45) NOT NULL,
  `file_name` varchar(128) NOT NULL,
  `duration` varchar(45) NOT NULL,
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_id1` (`id`) USING BTREE,
  UNIQUE KEY `idx_file_name` (`file_name`) USING BTREE,
  KEY `idx_id` (`id`) USING BTREE,
  KEY `track_ibfk_1` (`user_id`),
  CONSTRAINT `track_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `playlist_track` (
  `playlist_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL,
  UNIQUE KEY `idx_playlist_id_track_id` (`playlist_id`,`track_id`) USING BTREE,
  KEY `playlist_track_ibfk_2` (`track_id`),
  CONSTRAINT `playlist_track_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_track_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


SET @PREVIOUS_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


LOCK TABLES `user` WRITE;
ALTER TABLE `user` DISABLE KEYS;
ALTER TABLE `user` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `playlist` WRITE;
ALTER TABLE `playlist` DISABLE KEYS;
ALTER TABLE `playlist` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `track` WRITE;
ALTER TABLE `track` DISABLE KEYS;
ALTER TABLE `track` ENABLE KEYS;
UNLOCK TABLES;


LOCK TABLES `playlist_track` WRITE;
ALTER TABLE `playlist_track` DISABLE KEYS;
ALTER TABLE `playlist_track` ENABLE KEYS;
UNLOCK TABLES;




SET FOREIGN_KEY_CHECKS = @PREVIOUS_FOREIGN_KEY_CHECKS;


