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
-- Table structure for table `gatepass`
--

DROP TABLE IF EXISTS `gatepass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gatepass` (
  `GID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(60) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `HoDEmail` varchar(60) DEFAULT NULL,
  `Status` varchar(25) DEFAULT NULL,
  `project` varchar(30) DEFAULT NULL,
  `designation` varchar(30) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `RDate` date DEFAULT NULL,
  `purpose` varchar(90) DEFAULT NULL,
  `location` varchar(90) DEFAULT NULL,
  `item` varchar(50) DEFAULT NULL,
  `itemtype` varchar(30) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `invno` varchar(60) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  `officer` varchar(50) DEFAULT NULL,
  `newplace` varchar(200) DEFAULT NULL,
  `newofficer` varchar(60) DEFAULT NULL,
  `security` varchar(60) DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`GID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gatepass`
--

LOCK TABLES `gatepass` WRITE;
/*!40000 ALTER TABLE `gatepass` DISABLE KEYS */;
INSERT INTO `gatepass` VALUES (4,'RA','learnkandy@gmail.com','hodcs@123.com','Approve',NULL,'RA','2024-04-27','2024-04-30','Rapire PC','NIFS','i7 Computer','Computer',1,'NIFS/2024/02/04','Rapire i7 Computer at the CS lab','to@123.com','Colombo','kamal@123.com','Success','2024-04-13 11:38:36','2024-04-13 11:38:36'),(5,'RA','learnkandy@gmail.com','hodcs@123.com','HODReject',NULL,'RA','2024-05-04','2024-05-07','PC Rapire','NIFS','Computer','Lap',1,'NIFS/2024/02/04','Raipre I9 Laptop','to@123.com','Colombo','nimal@123.com','Waiting','2024-04-13 12:19:59','2024-04-13 12:19:59');
/*!40000 ALTER TABLE `gatepass` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  5:48:44
