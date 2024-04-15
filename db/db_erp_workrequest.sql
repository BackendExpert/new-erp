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
-- Table structure for table `workrequest`
--

DROP TABLE IF EXISTS `workrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workrequest` (
  `WID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(60) DEFAULT NULL,
  `project` varchar(60) DEFAULT NULL,
  `division` varchar(50) DEFAULT NULL,
  `RDate` date DEFAULT NULL,
  `WType` varchar(100) DEFAULT NULL,
  `HoDEmail` varchar(60) DEFAULT NULL,
  `SEmail` varchar(60) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `ReqNo` varchar(30) DEFAULT NULL,
  `Status` varchar(15) DEFAULT NULL,
  `Completed` int DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`WID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workrequest`
--

LOCK TABLES `workrequest` WRITE;
/*!40000 ALTER TABLE `workrequest` DISABLE KEYS */;
INSERT INTO `workrequest` VALUES (4,'RA','learnkandy@gmail.com','Computer Science','Computer Science','2024-05-02','Wiring','hodcs@123.com','to@123.com','Testing','WR/2024/02','Approve',1,'2024-04-12 14:16:28','2024-04-12 14:16:28'),(5,'hodcs','hodcs@123.com','Computer Science','Computer Science','2024-05-03','Computer Repair','hodcs@123.com','to@123.com','Testing',NULL,'Request',NULL,'2024-04-12 14:29:10','2024-04-12 14:29:10'),(6,'RA','learnkandy@gmail.com','Computer Science','Computer Science','2024-05-10','Computer Repair','hodcs@123.com','to@123.com','Testing',NULL,'HodReject',NULL,'2024-04-12 15:12:18','2024-04-12 15:12:18'),(7,'hodcs','hodcs@123.com','Computer Science','Computer Science','2024-04-18','Wiring','hodcs@123.com','to@123.com','Testing','WR/2024/03','Recommended',NULL,'2024-04-13 01:54:57','2024-04-13 01:54:57'),(8,'RA','learnkandy@gmail.com','Computer Science','Computer Science','2024-05-02','Computer Repair','hodcs@123.com','to@123.com','Testing','WR/2024/04','Reject',NULL,'2024-04-13 01:55:35','2024-04-13 01:55:35');
/*!40000 ALTER TABLE `workrequest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  5:48:41
