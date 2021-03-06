CREATE TABLE `users` (
	`uid` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(32) NOT NULL,
	`hash` VARCHAR(256) NOT NULL,
	`salt` VARCHAR(32) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`fullname` VARCHAR(100) NOT NULL,
	`is_admin` BOOLEAN NOT NULL DEFAULT '0',
	PRIMARY KEY (`uid`)
) ENGINE=InnoDB;

CREATE TABLE `locations` (
	`lid` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(32) NOT NULL,
	`description` TEXT,
	PRIMARY KEY (`lid`)
) ENGINE=InnoDB;

CREATE TABLE `packages` (
	`pid` INT NOT NULL AUTO_INCREMENT,
	`tid` VARCHAR(64) NOT NULL,
	`uid` INT,
	`to` TEXT NOT NULL,
	`address` TEXT NOT NULL,
	`time_scanned_in` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	`scanned_in_by` INT NOT NULL,
	`stored_in` INT,
	`checkout_by` INT,
	`checkout_time` INT,
	PRIMARY KEY (`pid`)
) ENGINE=InnoDB;
