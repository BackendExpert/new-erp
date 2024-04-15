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
-- Table structure for table `request_role`
--

DROP TABLE IF EXISTS `request_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_role` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `status` varchar(45) NOT NULL,
  `request_date` datetime NOT NULL,
  `role` varchar(45) NOT NULL,
  `eid` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_role`
--

LOCK TABLES `request_role` WRITE;
/*!40000 ALTER TABLE `request_role` DISABLE KEYS */;
INSERT INTO `request_role` VALUES (21,'hodcs@123.com','Accept','2024-04-09 19:43:01','HOD','2'),(22,'hodadmin@123.com','Accept','2024-04-09 19:43:45','HOD','3'),(23,'sci@123.com','Accept','2024-04-09 19:51:23','Scientist','4'),(24,'ra@123.com','Accept','2024-04-09 19:51:53','RA','5'),(25,'learnkandy@gmail.com','Accept','2024-04-09 19:58:00','RA','6'),(26,'to@123.com','Accept','2024-04-11 09:32:49','TO','8'),(27,'driver@123.com','Accept','2024-04-11 09:39:36','Driver','9'),(28,'hoddec@123.com','Accept','2024-04-12 08:21:26','HOD','7'),(29,'labM@123.com','Accept','2024-04-12 08:47:15','Labmanager','10'),(30,'lib@123.com','Accept','2024-04-14 21:17:39','Librarian','11'),(31,'acc@123.com','Accept','2024-04-15 05:28:04','Accountant','12');
/*!40000 ALTER TABLE `request_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  5:48:43
