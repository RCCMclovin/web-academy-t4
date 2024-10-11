CREATE DATABASE  IF NOT EXISTS `WA_DB01` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `WA_DB01`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 192.168.1.10    Database: WA_DB01
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categoria` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categoria`
--

LOCK TABLES `Categoria` WRITE;
/*!40000 ALTER TABLE `Categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `Categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `CPF` char(11) NOT NULL,
  `Nome` varchar(50) DEFAULT NULL,
  `Telefone` varchar(15) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  PRIMARY KEY (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enderecos_Cliente`
--

DROP TABLE IF EXISTS `Enderecos_Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enderecos_Cliente` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CPF` varchar(11) DEFAULT NULL,
  `Endereco` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CPF` (`CPF`),
  CONSTRAINT `Enderecos_Cliente_ibfk_1` FOREIGN KEY (`CPF`) REFERENCES `Cliente` (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enderecos_Cliente`
--

LOCK TABLES `Enderecos_Cliente` WRITE;
/*!40000 ALTER TABLE `Enderecos_Cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `Enderecos_Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `N_de_Serie`
--

DROP TABLE IF EXISTS `N_de_Serie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `N_de_Serie` (
  `Codigo` varchar(20) NOT NULL,
  `Produto_Id` int DEFAULT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `Produto_Id` (`Produto_Id`),
  CONSTRAINT `N_de_Serie_ibfk_1` FOREIGN KEY (`Produto_Id`) REFERENCES `Produto` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `N_de_Serie`
--

LOCK TABLES `N_de_Serie` WRITE;
/*!40000 ALTER TABLE `N_de_Serie` DISABLE KEYS */;
/*!40000 ALTER TABLE `N_de_Serie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pedido`
--

DROP TABLE IF EXISTS `Pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pedido` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Endereco_Id` int DEFAULT NULL,
  `Cliente_CPF` varchar(11) DEFAULT NULL,
  `DH` datetime DEFAULT NULL,
  `Desconto` int DEFAULT NULL,
  `Pagamento` varchar(100) DEFAULT NULL,
  `Total` float DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Endereco_Id` (`Endereco_Id`),
  KEY `Cliente_CPF` (`Cliente_CPF`),
  CONSTRAINT `Pedido_ibfk_1` FOREIGN KEY (`Endereco_Id`) REFERENCES `Enderecos_Cliente` (`Id`),
  CONSTRAINT `Pedido_ibfk_2` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente` (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pedido`
--

LOCK TABLES `Pedido` WRITE;
/*!40000 ALTER TABLE `Pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pedido_Produtos`
--

DROP TABLE IF EXISTS `Pedido_Produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pedido_Produtos` (
  `Pedido_Id` int DEFAULT NULL,
  `Produto_Id` int DEFAULT NULL,
  KEY `Pedido_Id` (`Pedido_Id`),
  KEY `Produto_Id` (`Produto_Id`),
  CONSTRAINT `Pedido_Produtos_ibfk_1` FOREIGN KEY (`Pedido_Id`) REFERENCES `Pedido` (`Id`),
  CONSTRAINT `Pedido_Produtos_ibfk_2` FOREIGN KEY (`Produto_Id`) REFERENCES `Produto` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pedido_Produtos`
--

LOCK TABLES `Pedido_Produtos` WRITE;
/*!40000 ALTER TABLE `Pedido_Produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pedido_Produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Produto`
--

DROP TABLE IF EXISTS `Produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Produto` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Cat_Id` int DEFAULT NULL,
  `SCat_Id` int DEFAULT NULL,
  `Modelo` varchar(20) DEFAULT NULL,
  `Fabricante` varchar(20) DEFAULT NULL,
  `Preco` float DEFAULT NULL,
  `Quantidade` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Cat_Id` (`Cat_Id`),
  KEY `SCat_Id` (`SCat_Id`),
  CONSTRAINT `Produto_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Categoria` (`Id`),
  CONSTRAINT `Produto_ibfk_2` FOREIGN KEY (`SCat_Id`) REFERENCES `SubCategoria` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Produto`
--

LOCK TABLES `Produto` WRITE;
/*!40000 ALTER TABLE `Produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `Produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubCategoria`
--

DROP TABLE IF EXISTS `SubCategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubCategoria` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(20) DEFAULT NULL,
  `Cat_Id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Cat_Id` (`Cat_Id`),
  CONSTRAINT `SubCategoria_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Categoria` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubCategoria`
--

LOCK TABLES `SubCategoria` WRITE;
/*!40000 ALTER TABLE `SubCategoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `SubCategoria` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 21:13:45
