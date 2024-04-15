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
  `is_active` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (45,'jehan','jehan@123.com','SuperAdmin','$2a$10$ETGYjYkmdTmt/K4RovDcHuIHh0ZaVfcGbKJUjJC/VNkC27Sn0NWu6','2024-04-09 14:05:38','2024-04-09 14:05:38',1),(46,'hodcs','hodcs@123.com','HOD','$2a$10$zma9ctc.srd9QfZq8Ew8veXa5MuSaBQG1nh8Jg19/2qr212Mh3TCW','2024-04-09 14:12:54','2024-04-09 14:12:54',1),(47,'HodAdmin','hodadmin@123.com','HOD','$2a$10$Z1krVzY3SJSZFr7I9DkssuJ1Qo5IuQrXmIszLp47VGvMCY0K/6G2C','2024-04-09 14:13:35','2024-04-09 14:13:35',1),(48,'Sci','sci@123.com','Scientist','$2a$10$1w2LpQREN1IvFWuHzPK5ueFkdQ3xac92SAik1si/qHsxCCFWo0QOK','2024-04-09 14:20:52','2024-04-09 14:20:52',1),(49,'RA','ra@123.com','RA','$2a$10$jnC9iEjJLDRM2wof.5/Y1u1wQhOimMEjwIqNnls9c5MxHZ3N2y7u.','2024-04-09 14:21:41','2024-04-09 14:21:41',1),(50,'RA','learnkandy@gmail.com','RA','$2a$10$8CGFAZnah0z6Su3cFS4O0OJE/FpKN1v6lrIB.WdauqgF0xaAE27um','2024-04-09 14:27:51','2024-04-09 14:27:51',1),(51,'KamalTO','to@123.com','TO','$2a$10$EDxBdrADsDea6pEFxnWZouHHLVX/r26cpOSHDd6edm3Yw1EoC6xu6','2024-04-11 04:02:19','2024-04-11 04:02:19',1),(52,'AmaraDriver','driver@123.com','Driver','$2a$10$Si4pLnZZGSVyDexMH2CW6uklpwcsKHXTEPbT2/AYbXV0ceifnrsI6','2024-04-11 04:09:17','2024-04-11 04:09:17',1),(53,'Derector','dec@123.com','Director','$2a$10$LbSLbOb2tAXCbiAEfyZkS.rQzX6jW.2IvnEcF0A4OUnG.IUP21WDK','2024-04-11 04:22:16','2024-04-11 04:22:16',1),(54,'HodDec','hoddec@123.com','HOD','$2a$10$G5dfZEXV2YU3Mufz7tTJoO1HAPo7QN6n6KDy.e9NOdg9doU83NtDO','2024-04-12 02:51:03','2024-04-12 02:51:03',1),(55,'LabManager','labM@123.com','Labmanager','$2a$10$KBM2gWT/PD1Aj6p054HOSurFblOUKkLawy9WPSRMreZZyojlNfJr6','2024-04-12 03:17:06','2024-04-12 03:17:06',1),(56,'Lib','lib@123.com','Librarian','$2a$10$f.IdtGQm6dNrPaEMU8ybpOU7f80H3xWgMQBymtdH8149RKNTI2hZm','2024-04-14 15:47:18','2024-04-14 15:47:18',1),(57,'AccAmara','acc@123.com','Accountant','$2a$10$pYSNLEEEKL1ntth.pYhJHezXdgYduxqid3laBGEMjQk20GV4cD7Ni','2024-04-14 23:57:54','2024-04-14 23:57:54',1);
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

-- Dump completed on 2024-04-15  5:48:42
