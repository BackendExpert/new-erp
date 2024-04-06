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
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `LID` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(15) DEFAULT NULL,
  `JobCategory` varchar(35) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `Duration` decimal(3,2) DEFAULT NULL,
  `HoDEmail` varchar(60) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `StartTime` varchar(10) DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Status` varchar(15) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`LID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (18,'Sick','TO','2024-04-16',1.00,'hod@123.com','To','10:37','2024-05-09','Requested','to@123.com','2024-04-04 13:04:05','2024-04-04 13:04:05'),(19,'Casual Half Day','SuperAdmin','2024-04-23',2.00,'hod@123.com','Jehan','10:38','2024-04-25','Requested','jehan@123.com','2024-04-04 13:04:40','2024-04-04 13:04:40'),(20,'Casual Half Day','RA','2024-04-16',2.00,'hod@123.com','learn','12:19','2024-04-18','Requested','learnkandy@gmail.com','2024-04-04 14:45:36','2024-04-04 14:45:36'),(21,'Sick Half Day','RA','2024-04-15',1.00,'hod@123.com','learn','11:20','2024-04-16','Requested','learnkandy@gmail.com','2024-04-04 14:46:51','2024-04-04 14:46:51');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
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
