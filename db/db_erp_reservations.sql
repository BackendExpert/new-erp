-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: db_erp
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `RID` int NOT NULL AUTO_INCREMENT,
  `StartDate` date DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `loc_route` varchar(100) DEFAULT NULL,
  `HoDEmail` varchar(60) DEFAULT NULL,
  `other_passengers` varchar(235) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `mode_travel` varchar(50) DEFAULT NULL,
  `Status` varchar(15) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `designation` varchar(30) DEFAULT NULL,
  `fundingsource` varchar(50) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `purpose` varchar(150) DEFAULT NULL,
  `veh_type` varchar(50) DEFAULT NULL,
  `driver` varchar(45) DEFAULT NULL,
  `DEmail` varchar(60) DEFAULT NULL,
  `milage` int DEFAULT NULL,
  `uprice` int DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (7,'2024-04-20','08:40','Kandy','hod@123.com','Nimal','Jehan','2024-04-23','Official','Requested','jehan@123.com','SuperAdmin','NIFS Funds','20','Meeting','Van',NULL,NULL,NULL,NULL,NULL,'2024-04-04 12:07:56','2024-04-04 12:07:56'),(8,'2024-05-10','08:45','Peradeniya','hod@123.com','Nimal','Jehan','2024-05-11','Official','Requested','jehan@123.com','SuperAdmin','NIFS Funds','20','Meeting','Cab',NULL,NULL,NULL,NULL,NULL,'2024-04-04 12:11:05','2024-04-04 12:11:05');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-06 10:23:39
