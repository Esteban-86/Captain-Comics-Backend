DROP TABLE IF EXISTS `heroes`;
DROP TABLE IF EXISTS `heroesMovies`;
DROP TABLE IF EXISTS `heroesGames`;

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

CREATE TABLE `heroesMovies` (
  `moviesId` int,
  `heroesId` int,
  FOREIGN KEY (moviesId) REFERENCES movies(id),
  FOREIGN KEY (heroesId) REFERENCES heroes(id)
);

INSERT INTO `heroesMovies` (`MoviesId`, `heroesId`) VALUES
  (1, 10),
  (2, 3),
  (3, 5),
  (4, 1),
  (5, 9)
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

CREATE TABLE `heroesGames` (
  `gamesId` int,
  `heroesId` int,
  FOREIGN KEY (gamesId) REFERENCES games(id),
  FOREIGN KEY (heroesId) REFERENCES heroes(id)
);

INSERT INTO `heroesGames` (`gamesId`, `heroesId`) VALUES
  (1, 4),
  (2, 10),
  (3, 2),
  (4, 5)
;