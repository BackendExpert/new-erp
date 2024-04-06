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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (34,'Jehan','jehan@123.com','SuperAdmin','$2a$10$qcdtOJcuPuuJlNjNNSOr2.np6TN5ZnVsRsK22Gvlb0YcRKogXuYjC','2024-04-02 12:52:50','2024-04-02 12:52:50',1),(35,'Director','dec@123.com','Director','$2a$10$SeC5xnWuR9ssZJql3SnHfuIu2OlwwxPdmxsnVxd.BXzozN/dIzLu2','2024-04-02 13:10:28','2024-04-02 13:10:28',1),(36,'Secretary','sec@123.com','Secretary','$2a$10$6P8OX4/meaAP./ZusvBKVenKPpb4cpTPAxGORUa610KtNllgnf676','2024-04-02 13:10:58','2024-04-02 13:10:58',1),(37,'admin','admin@123.com','Admin','$2a$10$CbnMqZHpUgmisq6BM8bN/.Hj.Mkz31c3DoJ9mSc4sVoCK19Cmg9DK','2024-04-02 13:11:15','2024-04-02 13:11:15',1),(38,'hod ','hod@123.com','HOD','$2a$10$eglk6pq5.21.PYn1ZPe1CexitOS1RXPQEdOjNKNT6aWwhTecptsfG','2024-04-04 01:17:15','2024-04-04 01:17:15',1),(39,'To','to@123.com','TO','$2a$10$ez2C6LPb5iv1f93BaHZGn.9WPQym7DFvUymUfJyUMYntYljUHNjSi','2024-04-04 12:12:49','2024-04-04 12:12:49',1),(40,'learn','learnkandy@gmail.com','RA','$2a$10$Cz.aYJQPmVdaLvg/y4ODyONWwQv/FobQ8fe/xTy0LTFOTXbizHgaq','2024-04-04 14:30:22','2024-04-06 04:44:17',1);
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

-- Dump completed on 2024-04-06 10:23:38
