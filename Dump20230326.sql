-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `idVacation` int NOT NULL,
  `idUser` int NOT NULL,
  PRIMARY KEY (`idVacation`,`idUser`),
  KEY `fk_idUser_idx` (`idUser`),
  CONSTRAINT `fk_idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_idVacation` FOREIGN KEY (`idVacation`) REFERENCES `vacations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (61,39),(62,39),(65,39),(90,39),(92,39),(93,39),(94,39),(59,40),(60,40),(61,40),(62,40),(63,40),(64,40),(65,40),(91,40),(92,40),(93,40),(58,53),(62,53),(63,53),(93,53),(94,53),(58,68),(60,68),(62,68),(63,68),(65,68),(59,69),(60,69),(65,69),(61,80),(92,80),(93,80);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('1','2') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (37,'Lidor','Levy','lidorlevy@gmail.com','$2b$10$T4pKcDxmW4STXAghfcJ9eeJYILvA3cvczsfadtLwuE1aXr02uY2w6','2'),(39,'Avigail','Levy','avigailLevy@gmail.com','$2b$10$QsiGP3YwsqC.yjnh4WiElePFvlVwylkVGhFYzGwMz2nsXQDZ/5M8G','1'),(40,'Noa','Levy','noalevy@gmail.com','$2b$10$0hzX9R4ryQkx2jBfjvFwo.KtPt0TdEcdpgXlCxluUv3wkLj3lL3Ve','1'),(41,'Idan','Levy','idanlevy@gmail.com','$2b$10$6bslTum/xpWM8BrHvuGuhuTktp.f97QECM4wDJxZ/nfkdSjeq3Bca','1'),(53,'Nitay','Levy','nitayLevy@gmail.com','$2b$10$CgAtzq5JBD4RnW/hpXD3sO/gsLcE4qYLHh5ehIO.Xc5KLZ1VmB2gG','1'),(68,'yakov','yakov','yakov@gmail.com','$2b$10$KoWrWpDZjjVKPkuLnMt32.8Ve/1ukc8HapiD61eBDDPVydvJgOklu','1'),(69,'Nitay','Levy','nitayLevy22@gmail.com','$2b$10$AO5coZJGJvsnbbY1gDbG1uMv8C2JkX4GAyHRl8XSWSKXKKIGpo6yW','1'),(80,'king','david','fff@d.com','$2b$10$h84QUoMbjLP0cbUQdGldQO0elOmus.oTsoXqwMvM5PqcScVZsNHR6','1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int NOT NULL,
  `image` longblob NOT NULL,
  `imageName` varchar(155) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (58,'London','London is the capital of the United Kingdom and England. London is the city region with the highest population in the United Kingdom.','2023-02-22','2023-02-27',789,_binary '{\"name\":\"London.jpg\",\"size\":21082,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"cba991fa8de60fb0c61fcc5d7f7e0296\"}','8b7b83d1-11e2-450e-b388-46db3c667f7f.jpg'),(59,'Bankok','Thailand has a climate determined by three seasons: summer, monsoon, and winter. Generally speaking, the weather is reasonably uniform through the country.','2023-02-17','2023-04-08',1500,_binary '{\"name\":\"Thailand.jpg\",\"size\":117117,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"47046422faf68ffa2800d312d673fc47\"}','38d10585-d75b-4fe4-9b6f-d4f9fa188795.jpg'),(60,'Rome','Rome ( Latin: Roma) is the capital city of Italy. It is also the capital and largest city in the region of Lazio, and the geographical region of Latium. It is on the Tiber River and has 2.8 million people.','2023-03-10','2023-03-19',1890,_binary '{\"name\":\"630x355.jpg\",\"size\":47758,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"122e1bef9930763bb7014c88216c4c13\"}','217d0c5b-937d-4c1f-9ecf-4402e6aaaa77.jpg'),(61,'Amsterdam','A young and vibrant city, Amsterdam is known for its rich heritage and picturesque locations. Iconic canals, famous museums, and upbeat nightclubs are the charm of this city.','2023-03-01','2023-03-14',1250,_binary '{\"name\":\"Amsterdam.jpg\",\"size\":21034,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"7542553ed811ca46d524bf474e2557ea\"}','83e514bd-1585-44f8-b262-ba3ea8bef8a3.jpg'),(62,'Jerusalem ','Jerusalem is a city in Western Asia. Situated on a plateau in the Judaean Mountains between the Mediterranean and the Dead Sea, it is one of the oldest cities in the world, and is considered holy for the three major Abrahamic religions','2023-03-08','2023-03-20',1278,_binary '{\"name\":\"Israel.jpg\",\"size\":458412,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"6b3c3e6d1ef650eea4d751a0bb335b4b\"}','d1f11aa4-746d-421d-8096-947d7dae0b6e.jpg'),(63,'Cancún','Cancun is known for having one of the best places in the world for parasailing and jet skiing. Visitors will surely love to relax and unwind at the city\'s shores which feature white sands and crystal blue waters.','2023-07-02','2023-07-31',7890,_binary '{\"name\":\"CancÃºn.jpg\",\"size\":387972,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"1f19400e84f65c45d55c5fb18e29ced2\"}','4c14d4cd-fd16-4cbf-9d4c-269324b81ce4.jpg'),(64,'Budapest','One of the most beautiful cities in the world, Budapest is the economic and cultural center of the country. The city is best known for big castles, ancient churches, appealing architectural bridges, and breathtaking avenues.','2023-06-06','2023-06-16',890,_binary '{\"name\":\"budapest.jpg\",\"size\":59306,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"1c8ac2d07f828bf9b4696cdbf2e93d06\"}','a1d8ad6f-39ec-42b0-937a-098d79505efe.jpg'),(65,'Honolulu','Honolulu is the most populous island and capital of Hawaii which is known for its fabulous natural setting, the city is filled with gorgeous beaches and adventurous hikes','2023-03-01','2023-03-21',1980,_binary '{\"name\":\"Honolulu.jpg\",\"size\":967280,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"8b318dbb2698a971afece5db9f00e523\"}','e012247a-dd6b-4810-ba33-60f3fa9d3a7f.jpg'),(90,'Columbia','Columbia is the capital of the U.S. state of South Carolina. With a population of 136,632 as of the 2020 U.S. Census, it is the second-largest city in South Carolina. The city serves as the county seat of Richland County,','2023-06-01','2023-07-01',1980,_binary '{\"name\":\"Columbia.jpg\",\"size\":104962,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"f78908626dc6dd72ef9d476ba27b88a5\"}','df6dfa15-8c7b-4dd8-9907-441669007783.jpg'),(91,'Seoul','The powerhouse capital of South Korea is a city of contrasts. Here, centuries-old Buddhist temples stand alongside the shimmering skyscrapers of global tech companies.','2023-08-20','2023-09-20',2549,_binary '{\"name\":\"South Korea.jpg\",\"size\":667742,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"cccf1ae27ff04b62502c18d45a26b30b\"}','408c0b98-211e-4419-b4c3-391488d9a458.jpg'),(92,'Zanzibar ','Zanzibar City or Mjini District, often simply referred to as Zanzibar is one of two administrative districts of Mjini Magharibi Region in Tanzania. The district covers an area of 15.4 km²','2023-06-01','2023-06-19',1250,_binary '{\"name\":\"Zanzibar 02.jpg\",\"size\":16233,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"4f91fdb7a023874fa494241ae6e8c9f6\"}','8657f95b-43ef-4041-b3b1-404096ec0b3d.jpg'),(93,'Crete','Crete is the largest and most populous of the Greek islands, the 88th largest island in the world and the fifth largest island in the Mediterranean Sea, after Sicily, Sardinia, Cyprus, and Corsica.','2023-07-09','2023-07-16',748,_binary '{\"name\":\"Crete.jpg\",\"size\":489506,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"446ae5de9cbfe4b503997b729fb10186\"}','1c588d97-c5e5-4224-b7fd-13e662b8c915.jpg'),(94,'New York','New York is primarily known for its most sought-after city on Earth, New York City. Home to United Nations, it is the financial and cultural hub of the world, significantly influencing commerce, entertainment, research, technology, and tourism.','2023-12-20','2025-01-05',3749,_binary '{\"name\":\"New York.jpg\",\"size\":600713,\"encoding\":\"7bit\",\"tempFilePath\":\"\",\"truncated\":false,\"mimetype\":\"image/jpeg\",\"md5\":\"c97183c37adcaf3cb6957b55330cfbf1\"}','91ce9e3a-1fab-4e70-b041-e450b4befc54.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-26 22:27:36
