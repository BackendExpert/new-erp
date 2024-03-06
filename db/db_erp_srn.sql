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
-- Table structure for table `srn`
--

DROP TABLE IF EXISTS `srn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `srn` (
  `Name` varchar(60) DEFAULT NULL,
  `Email` varchar(60) NOT NULL,
  `project` varchar(30) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `Rdate` date NOT NULL,
  `srnType` varchar(90) DEFAULT NULL,
  `PType` varchar(90) DEFAULT NULL,
  `PIype` varchar(90) DEFAULT NULL,
  `estimate` decimal(8,2) DEFAULT NULL,
  `vote` varchar(100) DEFAULT NULL,
  `HoDEmail` varchar(60) DEFAULT NULL,
  `description` varchar(254) DEFAULT NULL,
  `ReqNo` varchar(30) DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `SID` int NOT NULL AUTO_INCREMENT,
  `Cdate` date DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `srn`
--

LOCK TABLES `srn` WRITE;
/*!40000 ALTER TABLE `srn` DISABLE KEYS */;
/*!40000 ALTER TABLE `srn` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05  7:17:45
