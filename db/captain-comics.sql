DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `heroes_games`;
DROP TABLE IF EXISTS `heroes_movies`;
DROP TABLE IF EXISTS `games`;
DROP TABLE IF EXISTS `movies`;
DROP TABLE IF EXISTS `heroes`;

CREATE TABLE `heroes` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL
);

INSERT INTO `heroes` (`name`) VALUES
  ('Captain America'),
  ('Iron Man'),
  ('Thor'),
  ('Les gardiens de la galaxie'),
  ('Spiderman'),
  ('Hulk'),
  ('Black Widow'),
  ('Doctor Strange'),
  ('Blank Panther'),
  ('Avengers')
;


CREATE TABLE `movies` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `releaseDate` date NOT NULL,
  `picture` varchar(255)
);

INSERT INTO `movies` (`name`, `description`, `releaseDate`, `picture`) VALUES
  ('Avengers End-Game', 'desc', '2019-04-24', 'https://picsum.photos/200/300'),
  ('Thor Ragnarok', 'desc', '2017-10-25', 'https://picsum.photos/200/300'),
  ('Spiderman No Way Home', 'desc', '2021-12-15', 'https://picsum.photos/200/300'),
  ('Captain America First Avenger', 'desc', '2011-08-17', 'https://picsum.photos/200/300'),
  ('Black Panther', 'desc', '2018-02-16', 'https://picsum.photos/200/300')
;

CREATE TABLE `games` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `releaseDate` date NOT NULL,
  `picture` varchar(255)
);

INSERT INTO `games` (`name`, `description`, `releaseDate`, `picture`) VALUES
  ('Guardian of the galaxy', 'desc', '2021-10-26', 'https://picsum.photos/200/300'),
  ('Marvel Avengers', 'desc', '2020-08-14', 'https://picsum.photos/200/300'),
  ('Marvel Iron Man', 'desc', '2020-07-03', 'https://picsum.photos/200/300'),
  ('Marvel Spiderman', 'desc', '2018-09-07', 'https://picsum.photos/200/300')
;

CREATE TABLE `heroes_movies` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `moviesId` INT NOT NULL,
  `heroesId` INT NOT NULL,
  FOREIGN KEY (movie_Id) REFERENCES movies(id),
  FOREIGN KEY (heroe_Id) REFERENCES heroes(id)
);

INSERT INTO `heroes_movies` (`movie_id`, `heroe_id`) VALUES
  (1, 10),
  (2, 3),
  (3, 5),
  (4, 1),
  (5, 9)
;

CREATE TABLE `heroes_games` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `gamesId` INT NOT NULL,
  `heroesId` INT NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(id),
  FOREIGN KEY (heroe_id) REFERENCES heroes(id)
);

INSERT INTO `heroes_games` (`game_id`, `heroe_id`) VALUES
  (1, 4),
  (2, 10),
  (3, 2),
  (4, 5)
;

CREATE TABLE `admins`(
  `id`INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstname`VARCHAR (255) NOT NULL,
  `lastname`VARCHAR(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
);

INSERT INTO `admins` (`firstname`, `lastname`, `email`, `password` ) VALUES
('Esteban', 'POHIN', 'esteban.pohin86@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$RzLsYOj7bG5tvfnaYm5Tgw$gt56Hx0r5WBP4cMGzXD40S9S8LS+9wt06myeO40ZfYM')
;