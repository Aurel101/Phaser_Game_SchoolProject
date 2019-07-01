-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 30, 2019 at 03:27 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game`
--

-- --------------------------------------------------------

--
-- Table structure for table `highscores`
--

DROP TABLE IF EXISTS `highscores`;
CREATE TABLE IF NOT EXISTS `highscores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT 'Unknown',
  `score` int(11) NOT NULL DEFAULT '0',
  `stage` int(11) NOT NULL DEFAULT '1',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `highscores`
--

INSERT INTO `highscores` (`id`, `username`, `score`, `stage`, `time`) VALUES
(1, 'Nameless', 2100, 2, '2019-06-03 15:18:44'),
(2, 'Nameless', 2050, 2, '2019-06-02 15:18:45'),
(3, 'Aurel', 950, 1, '2019-06-01 15:18:44'),
(4, 'Nameless', 950, 1, '2019-05-03 15:18:44'),
(5, 'Unknow', 4200, 0, '2019-05-04 15:18:44'),
(6, 'Unknow', 750, 1, '2019-05-05 15:18:44'),
(7, 'Aurel', 1350, 2, '2019-05-06 15:18:44'),
(8, 'Aurel', 2850, 3, '2019-05-07 15:18:44'),
(9, 'Aurel', 650, 1, '2019-05-08 15:18:44'),
(10, 'Unknow', 1600, 2, '2019-05-09 15:18:44'),
(11, 'Aurel', 3050, 3, '2019-06-05 08:01:28'),
(12, 'Unknow', 2800, 3, '2019-06-05 08:28:28'),
(13, 'Unknow', 1900, 2, '2019-06-22 08:38:03'),
(14, 'Unknow', 2000, 2, '2019-06-22 08:38:15'),
(15, 'Unknow', 2000, 2, '2019-06-22 08:39:25'),
(16, 'Unknow', 1600, 3, '2019-06-22 08:40:20'),
(17, 'Unknow', 400, 1, '2019-06-22 09:05:06'),
(18, 'Unknow', 2400, 3, '2019-06-22 09:06:31'),
(19, 'Unknow', 700, 1, '2019-06-22 09:07:30'),
(20, '0', 3000, 3, '2019-06-22 09:08:24'),
(21, 'Unknow', 200, 1, '2019-06-22 09:10:28'),
(22, 'Unknow', 550, 1, '2019-06-22 09:11:02'),
(23, 'Unknow', 700, 1, '2019-06-22 09:11:46'),
(24, 'Unknow', 1350, 2, '2019-06-22 09:12:48'),
(25, 'Unknow', 900, 2, '2019-06-22 09:13:44'),
(26, 'Unknow', 500, 1, '2019-06-22 09:19:08'),
(27, 'Unknow', 2000, 2, '2019-06-22 09:19:57'),
(28, 'Unknow', 950, 1, '2019-06-22 09:21:16'),
(29, 'Unknow', 950, 1, '2019-06-22 09:22:48'),
(30, 'Unknow', 1900, 2, '2019-06-22 09:24:18'),
(31, 'Unknow', 700, 1, '2019-06-22 09:26:03'),
(32, 'Unknow', 450, 1, '2019-06-22 09:28:21'),
(33, 'Unknow', 150, 1, '2019-06-22 09:29:26'),
(34, 'Unknow', 550, 1, '2019-06-22 10:19:52'),
(35, 'Unknow', 500, 1, '2019-06-22 10:25:31'),
(36, 'Unknow', 600, 1, '2019-06-22 10:34:36'),
(37, 'Unknow', 3850, 0, '2019-06-22 10:38:00'),
(38, 'Unknow', 4850, 1, '2019-06-23 13:29:21'),
(39, 'Unknow', 6800, 2, '2019-06-23 13:59:06'),
(40, 'Unknow', 910, 1, '2019-06-23 14:03:40'),
(41, 'Unknow', 880, 1, '2019-06-23 14:04:24'),
(42, 'Unknow', 880, 1, '2019-06-23 14:04:24'),
(43, 'Aurel', 990, 1, '2019-06-23 14:23:54'),
(44, 'Aurel', 990, 1, '2019-06-23 14:23:54'),
(45, 'Aurel', 660, 1, '2019-06-23 14:51:28'),
(46, 'Aurel', 6680, 3, '2019-06-23 14:54:38'),
(47, 'Aurel', 600, 1, '2019-06-23 14:57:26'),
(48, 'Aurel', 600, 1, '2019-06-23 14:57:26'),
(49, 'Aurel', 600, 1, '2019-06-23 14:57:26'),
(50, 'Aurel', 600, 1, '2019-06-23 14:57:26'),
(51, 'Aurel', 3510, 2, '2019-06-23 14:58:43'),
(52, 'Aurel', 3880, 2, '2019-06-23 14:59:45'),
(53, 'Aurel', 4020, 2, '2019-06-23 15:03:04'),
(54, 'Aurel', 5220, 3, '2019-06-23 15:04:03'),
(55, 'Aurel', 970, 1, '2019-06-29 13:49:48'),
(56, 'Aurel', 970, 1, '2019-06-29 13:49:57'),
(57, 'Aurel', 3720, 2, '2019-06-29 13:53:40'),
(58, 'Aurel', 3950, 2, '2019-06-29 14:12:45'),
(59, 'Aurel', 970, 1, '2019-06-29 14:13:07'),
(60, 'Aurel', 970, 1, '2019-06-29 14:13:07'),
(61, 'Aurel', 970, 1, '2019-06-29 14:13:07'),
(62, 'Aurel', 6900, 3, '2019-06-29 14:23:40'),
(63, 'Aurel', 4460, 0, '2019-06-29 14:24:36'),
(64, 'Aurel', 5840, 5, '2019-06-29 14:27:26'),
(65, 'Aurel', 9970, 7, '2019-06-29 14:29:00'),
(66, 'Aurel', 950, 1, '2019-06-29 14:29:24'),
(67, 'Aurel', 10270, 7, '2019-06-29 14:32:33'),
(68, 'Aurel', 9760, 7, '2019-06-29 14:35:11'),
(69, 'Aurel', 10280, 7, '2019-06-29 14:37:33'),
(70, 'Aurel', 10320, 7, '2019-06-29 14:39:35'),
(71, 'Aurel', 8810, 6, '2019-06-29 14:40:53'),
(72, 'Aurel', 13740, 7, '2019-06-29 14:42:42'),
(73, 'Aurel', 2340, 2, '2019-06-29 15:39:13'),
(74, 'Aurel', 9190, 6, '2019-06-29 15:42:29'),
(75, 'Aurel', 3670, 3, '2019-06-29 15:45:41'),
(76, 'Aurel', 3710, 3, '2019-06-29 15:51:16'),
(77, 'Aurel', 2060, 2, '2019-06-29 15:51:38'),
(78, 'Aurel', 2060, 0, '2019-06-29 15:51:38'),
(79, 'Aurel', 12300, 7, '2019-06-29 15:55:43'),
(80, 'Aurel', 1020, 1, '2019-06-29 16:15:06'),
(81, 'Aurel', 2190, 2, '2019-06-29 16:17:31'),
(82, 'Aurel', 2190, 0, '2019-06-29 16:17:31'),
(83, 'Aurel', 1080, 1, '2019-06-29 16:19:19'),
(84, 'Aurel', 1080, 0, '2019-06-29 16:19:19'),
(85, 'Aurel', 980, 1, '2019-06-29 16:19:25'),
(86, 'Aurel', 860, 1, '2019-06-29 16:20:23'),
(87, 'Aurel', 860, 0, '2019-06-29 16:20:23'),
(88, 'Aurel', 950, 1, '2019-06-29 16:21:06'),
(89, 'Aurel', 950, 0, '2019-06-29 16:21:06'),
(90, 'Aurel', 930, 1, '2019-06-29 16:21:27'),
(91, 'Aurel', 870, 1, '2019-06-29 16:21:51'),
(92, 'Aurel', 880, 1, '2019-06-29 16:22:08'),
(93, 'Aurel', 1260, 2, '2019-06-29 16:24:08'),
(94, 'Aurel', 13630, 7, '2019-06-29 17:14:22'),
(95, 'Aurel', 960, 1, '2019-06-30 14:47:20'),
(96, 'Aurel', 960, 0, '2019-06-30 14:47:20'),
(97, 'Aurel', 960, 0, '2019-06-30 14:47:20'),
(98, 'Aurel', 950, 1, '2019-06-30 15:03:11');

-- --------------------------------------------------------

--
-- Stand-in structure for view `top10`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `top10`;
CREATE TABLE IF NOT EXISTS `top10` (
`username` varchar(255)
,`score` int(11)
);

-- --------------------------------------------------------

--
-- Structure for view `top10`
--
DROP TABLE IF EXISTS `top10`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top10`  AS  select `highscores`.`username` AS `username`,`highscores`.`score` AS `score` from `highscores` order by `highscores`.`score` desc limit 10 ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
