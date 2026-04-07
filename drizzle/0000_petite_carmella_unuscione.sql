CREATE TABLE `achievements` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`year` varchar(4) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`scope` varchar(50) NOT NULL,
	`image` text NOT NULL,
	`icon` varchar(50),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_features` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `project_features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_galleries` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`image_url` text NOT NULL,
	CONSTRAINT `project_galleries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_tech_stack` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`icon` varchar(50),
	CONSTRAINT `project_tech_stack_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`long_description` text NOT NULL,
	`challenge` text NOT NULL,
	`solution` text NOT NULL,
	`impact` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`image` text NOT NULL,
	`aspect_ratio` varchar(50) NOT NULL DEFAULT 'aspect-video',
	`year` varchar(4) NOT NULL,
	`client` varchar(255) NOT NULL,
	`status` varchar(100) NOT NULL,
	`link` text,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `service_features` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `service_features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(50) NOT NULL,
	`image` text NOT NULL,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
