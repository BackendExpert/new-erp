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
INSERT INTO `employee` VALUES (1,'ABC','Jehan','Kandy',711758851,'jehan@123.com',NULL,NULL,NULL,'SuperAdmin','Non Academic','200105101033',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-08 18:30:00','2024-04-08 18:30:00'),(2,'XYZ','Perera','88, Crosses Street, Kandy',711758851,'hodcs@123.com',NULL,90000.00,'image_1712671796712.jpg','HOD','Academic','200133202630','2001-02-02','0711758851','Permanent','Single','Male','Buddhist',28,'2024-04-09 14:09:57','2024-04-09 14:09:57'),(3,'ABC','Somarathene','Walala',711758851,'hodadmin@123.com',NULL,90000.00,'image_1712671859527.jpg','HOD','Non Academic','200133202630','1998-02-02','0711758851','Permanent','Married','Male','Buddhist',29,'2024-04-09 14:11:00','2024-04-09 14:11:00'),(4,'QWE','Somarathene','88, Crosses Street, Kandy',711758851,'sci@123.com',NULL,113000.00,'image_1712672363838.jpg','Scientist','Academic','96325874V','2024-04-04','0711758851','Permanent','Married','Male','Buddhist',28,'2024-04-09 14:19:24','2024-04-09 14:19:24'),(5,'FGH','Perera','Walala',711758851,'ra@123.com',NULL,65000.00,'image_1712672409310.jpg','RA','Academic','200133202630','2023-11-17','0711758851','Permanent','Single','Male','Buddhist',28,'2024-04-09 14:20:09','2024-04-09 14:20:09'),(6,'abc','Perera','88, Crosses Street, Kandy',711758851,'learnkandy@gmail.com',NULL,65000.00,'image_1712672826974.jpg','RA','Academic','200133202630','2001-02-20','0711758851','Permanent','Single','Male','Buddhist',28,'2024-04-09 14:27:07','2024-04-09 14:27:07'),(7,'ABC','Somarathene','88, Crosses Street, Kandy',711758851,'hoddec@123.com',NULL,90000.00,'image_1712674403756.jpg','HOD','Non Academic','200133202630','2024-02-01','0711758851','Permanent','Single','Male','Buddhist',30,'2024-04-09 14:53:24','2024-04-09 14:53:24'),(8,'ABC','Perera','88, Crosses Street, Kandy',711758851,'to@123.com',NULL,80000.00,'image_1712808112304.jpeg','TO','Non Academic','200133202630','2023-08-02','0711758851','Permanent','Single','Male','Buddhist',29,'2024-04-11 04:01:52','2024-04-11 04:01:52'),(9,'ABC','Perera','88, Crosses Street, Kandy',711758851,'driver@123.com',NULL,57000.00,'image_1712808530182.jpeg','Driver','Non Academic','200133202630','2023-12-15','0711758851','Permanent','Married','Male','Buddhist',29,'2024-04-11 04:08:50','2024-04-11 04:08:50'),(10,'ABC','Perera','88, Crosses Street, Kandy',711758851,'labM@123.com',NULL,135000.00,'image_1712891801257.jpeg','Labmanager','Non Academic','200133202630','2023-11-16','0711758851','Permanent','Single','Male','Buddhist',29,'2024-04-12 03:16:41','2024-04-12 03:16:41'),(11,'ABC','Perera','88, Crosses Street, Kandy',711758851,'lib@123.com',NULL,81300.00,'image_1713109615776.jpeg','Librarian','Non Academic','200133202630','2001-02-20','0711758851','Permanent','Married','Male','Buddhist',29,'2024-04-14 15:46:56','2024-04-14 15:46:56'),(12,'XYZ','Perera','88, Crosses Street, Kandy',711758851,'acc@123.com',NULL,46500.00,'image_1713139054156.jpeg','Accountant','Non Academic','96325874V','1999-12-02','0711758851','Permanent','Married','Male','Buddhist',29,'2024-04-14 23:57:34','2024-04-14 23:57:34');
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

-- Dump completed on 2024-04-15  5:48:40
