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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `eid` int NOT NULL,
  `initial` varchar(25) DEFAULT NULL,
  `surname` varchar(150) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `designation` varchar(20) DEFAULT NULL,
  `nic` varchar(12) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `emgcontact` varchar(245) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `civilstatus` varchar(25) DEFAULT NULL,
  `gender` varchar(25) DEFAULT NULL,
  `relig` varchar(25) DEFAULT NULL,
  `dno` int DEFAULT NULL,
  `create_at` timestamp NOT NULL,
  `update_at` timestamp NOT NULL,
  PRIMARY KEY (`eid`),
  KEY `dno` (`dno`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dno`) REFERENCES `division` (`did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,NULL,NULL,NULL,NULL,'jehan@123.com',NULL,NULL,NULL,'SuperAdmin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-02 12:52:03','2024-04-02 12:52:03'),(2,NULL,NULL,NULL,NULL,'dec@123.com',NULL,NULL,'image_1712063339153.jpg','Director','Non Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-02 13:08:59','2024-04-02 13:08:59'),(3,NULL,NULL,NULL,NULL,'sec@123.com',NULL,NULL,'image_1712063358713.PNG','Secretary','Non Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-02 13:09:19','2024-04-02 13:09:19'),(4,NULL,NULL,NULL,NULL,'admin@123.com',NULL,NULL,'image_1712063396177.PNG','Admin','Non Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-02 13:09:56','2024-04-02 13:09:56'),(5,NULL,NULL,NULL,NULL,'hod@123.com',NULL,NULL,'image_1712193416426.jpg','HOD','Non Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-04 01:16:56','2024-04-04 01:16:56'),(6,NULL,NULL,NULL,NULL,'to@123.com',NULL,NULL,'image_1712232747507.jpg','TO','Non Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-04 12:12:28','2024-04-04 12:12:28'),(7,NULL,NULL,NULL,NULL,'learnkandy@gmail.com',NULL,NULL,'image_1712241007991.jpg','RA','Academic',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-04 14:30:08','2024-04-04 14:30:08');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
