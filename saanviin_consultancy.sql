-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 07, 2020 at 09:19 PM
-- Server version: 10.3.22-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saanviin_consultancy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`_id`, `name`, `email`, `password`) VALUES
(1, 'Admin Name', 'admin-demo@gmail.com', 'Reactnative@2018');

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `_id` int(11) NOT NULL,
  `scholarship_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`_id`, `scholarship_id`, `user_id`, `date`, `time`, `status`) VALUES
(1, '12', '3', '1/2/2020 ', ' 12:49:23', 'REJECTED'),
(2, '12', '6', '1/2/2020 ', ' 12:53:5', 'APPLIED'),
(3, '14', '6', '1/2/2020 ', ' 13:47:58', 'APPROVED'),
(4, '12', '6', '1/2/2020 ', ' 13:50:31', 'APPLIED'),
(5, '14', '6', '1/2/2020 ', ' 13:53:19', 'APPLIED'),
(6, '14', '6', '1/2/2020 ', ' 13:54:1', 'APPLIED'),
(7, '14', '6', '1/2/2020 ', ' 8:40:35', 'APPLIED'),
(8, '12', '7', '1/2/2020 ', ' 8:41:15', 'APPLIED'),
(9, '12', '1', '1/2/2020 ', ' 9:37:0', 'APPLIED'),
(10, '12', '1', '1/2/2020 ', ' 9:38:27', 'APPROVED');

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `_id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`_id`, `name`) VALUES
(2, 'New York'),
(3, 'Sydney'),
(8, 'Shanghai'),
(6, 'Agbeston'),
(7, 'TOKYO');

-- --------------------------------------------------------

--
-- Table structure for table `degree`
--

CREATE TABLE `degree` (
  `_id` int(11) NOT NULL,
  `university_id` int(11) NOT NULL,
  `title` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `degree`
--

INSERT INTO `degree` (`_id`, `university_id`, `title`) VALUES
(10, 6, 'CSE'),
(9, 6, 'ME'),
(8, 7, 'CSE'),
(7, 7, 'ECE');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `language` text NOT NULL,
  `_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`language`, `_id`) VALUES
('German', 11),
('French', 9),
('English', 7),
('CHINESE', 12);

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `_id` int(11) NOT NULL,
  `major` text NOT NULL,
  `program_id` text NOT NULL,
  `city` text NOT NULL,
  `degree` text NOT NULL,
  `language` text NOT NULL,
  `intake` text NOT NULL,
  `application_fee` text NOT NULL,
  `banner` text NOT NULL,
  `service_fee` text NOT NULL,
  `insurance_fee` text NOT NULL,
  `visa_fee` text NOT NULL,
  `tution_fee` text NOT NULL,
  `hostel_fee` text NOT NULL,
  `duration` text NOT NULL,
  `age_limit` text NOT NULL,
  `application_deadline` text NOT NULL,
  `grade_required` text NOT NULL,
  `english_proficiency` text NOT NULL,
  `restricted_countries` text NOT NULL,
  `required_documents` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `scholarship`
--

INSERT INTO `scholarship` (`_id`, `major`, `program_id`, `city`, `degree`, `language`, `intake`, `application_fee`, `banner`, `service_fee`, `insurance_fee`, `visa_fee`, `tution_fee`, `hostel_fee`, `duration`, `age_limit`, `application_deadline`, `grade_required`, `english_proficiency`, `restricted_countries`, `required_documents`) VALUES
(12, 'ECE', '123456ECE', '', 'ECE', 'CHINESE', '150', '200000', 'bf479473c2273a6fbac7756d614e1093', '399999', '10000', '20000', '2390888', '230000', '4 years', '24', '22/02/2020', '12th', 'Excellent', 'india,china', 'pancard,visa'),
(14, 'CSE', '12345CSENGINEERING', '', 'CSE', 'French', '180', '290000', '8de706acc931ed3dcae4329e4e5518b8', '290000', '290000', '290000', '290000', '290000', '3 years', '22', '29/02/2020', '12th', 'No', 'India,USA,china', 'Visa'),
(13, 'CSE', '1223456ECE', '', 'CSE', 'English', '200', '230000', '627577e20629230c7b91833ff6de7df3', '230000', '230000', '230000', '230000', '230000', '3 years', '26', '22/03/2020', '12th', 'good', 'India,China', 'Visa');

-- --------------------------------------------------------

--
-- Table structure for table `university`
--

CREATE TABLE `university` (
  `_id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `university`
--

INSERT INTO `university` (`_id`, `name`) VALUES
(7, 'DEMO UNIVERSITY CHINA'),
(6, 'MITS CHINA');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`_id`, `name`, `email`, `mobile`, `address`, `password`) VALUES
(1, 'Peter', 'peter@gmail.com', '8878242398', 'DEMO ADDRESS', '$2a$10$LwCHyZLdS/jBfZkTg.cW4uvPjm3HLPhGDczwe34UV.6v1bO/KjqyK'),
(2, 'Harry', 'harry@gmail.com', '8878242398', 'DEmo address', '$2a$10$RlCO1Y6T/zB6e/TBLq4yKeW1qI6FcQ3xFYfe64xJ97bYE.2aL5i66'),
(3, 'DEMO USER NAME', 'demouser@gmail.com', '8878242398', 'KJKJK DEMO ADDRESS', '$2a$10$WjHtOK8TiCXkp5w7g7NlWeBmpUqzWgYa5ebHhY4w5Y6ng9HO9GhT2'),
(4, 'DEMO2', 'demo2@gmail.com', '7766554433', 'DEMO ADDRESS', '$2a$10$.WBASIcBiX9.q4eFlgF6xuZxNRPGRwvtvhvscFHImrqFpSQNT65qq'),
(5, 'DEMO2', 'demo3@gmail.com', '7766554433', 'DEMO ADDRESS', '$2a$10$aAuJ97Iq5L/8tN9pTu5TtOtFz2iWylhblUKvGTPbppvVuRFbDeeby'),
(6, 'Kajal namdev', 'kajal@gmail.com', '7766554433', 'DEMO ADDRESS 34', '$2a$10$w4Sil5OvrEPZMWYyeWvjBuv2q94d2X4hUDm4Ymj85E8y58edKG97a'),
(7, 'Rafsanjanee Rizvi', 'rafsanjanee@163.com', '008613754200191', 'Hiding to 5_102, wuxing district', '$2a$10$VV.sa9bcf20LUkt4jssNG.4ImsMtpdf0Crxh6FUzGzJt7tjpds0Cm'),
(8, 'PETER', 'PETER@gmail.com', '88776665544', 'DEMO ADDRESS', '$2a$10$VV.sa9bcf20LUkt4jssNG.pBox6CiuBh2UUJLvSUDNycCKsgvQay.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `degree`
--
ALTER TABLE `degree`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `university`
--
ALTER TABLE `university`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `degree`
--
ALTER TABLE `degree`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `university`
--
ALTER TABLE `university`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
