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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(234) NOT NULL,
  `email` varchar(150) NOT NULL,
  `role` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Jehan','jehan@123.com','SuperAdmin','$2a$10$ucr7KfcrQ18HEnIys9PWw.SWolOSZzp6D0U6iVaknCe4EWbC8.2by','2024-03-03 04:58:06','2024-03-03 04:58:06'),(6,'Amara','amara@456.com','HOD','$2a$10$oaTOVDpogZGN6fcq8HsH2et0WUtSPa0JVEK.OMG7aEFFJPqKmzTtW','2024-03-03 04:58:21','2024-03-03 04:58:21'),(7,'kamal','kamal@789.com','Admin','$2a$10$Gw3RpY4a6e1tJS4dBbyz7uGKKb9TTJ6whs7Rig25CLz6gk7CINjF2','2024-03-03 20:04:37','2024-03-03 20:04:37'),(8,'nimal','nimal@741.com','TO','$2a$10$gsRBzV/ikAZKMkef6tGw4emRwFhL8ZvPJnG0G3k4oB0y8Ly1S4LJ.','2024-03-03 20:05:55','2024-03-03 20:05:55'),(9,'some','some@852.com','Librarian','$2a$10$UtW2sZMsPUTq33iz31Ny4erhHzVlfZhYLOo1ThntrBKMrGxYp1ADu','2024-03-03 20:06:28','2024-03-03 20:06:28'),(10,'perera','perera@963.com','Labmanager','$2a$10$fNjdqO4SVeIGwGSzsN9KceyuoxXsJ.ot369seDAN2idgCatZKNSDO','2024-03-03 20:06:52','2024-03-03 20:06:52'),(11,'nimali','nimali@951.com','Accountant','$2a$10$KFUluX0fOYyRpQkGg47ntOn0U1HD.Q1O3NoDgNxqSNFE4hf8zfMBy','2024-03-03 20:07:19','2024-03-03 20:07:19'),(12,'kamala','kamala@753.com','User','$2a$10$33np5e9XT4qkBJ3dRiiDxOGT1m2lxgjn4ucfx6dPqeVRGxd1Mnw6q','2024-03-03 20:07:33','2024-03-03 20:07:33'),(13,'abcd','abcd@abcd.com','Admin','$2a$10$62jc9FOi5Oh8ocJigycv4.4DRAg4m/HzdMTCEfmMSebjnl8v.zAMm','2024-03-04 01:02:14','2024-03-04 01:02:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-04  6:49:47
