CREATE DATABASE  IF NOT EXISTS `db_teste` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_teste`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 192.168.1.10    Database: db_teste
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
-- Table structure for table `livros`
--

DROP TABLE IF EXISTS `livros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livros` (
  `id` varchar(36) NOT NULL,
  `nome` varchar(180) NOT NULL,
  `sinopse` text NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `autores` json NOT NULL,
  `url_imagem` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livros`
--

LOCK TABLES `livros` WRITE;
/*!40000 ALTER TABLE `livros` DISABLE KEYS */;
INSERT INTO `livros` VALUES ('1','PostgreSQL: Banco de dados para aplicações web modernas','Tecnologias de banco de dados dão suporte diário para operações e tomadas de decisões nos mais diversos níveis da empresa, da operação à gerência. Eles são vitais para as organizações modernas que querem se manter competitivas no mercado e no cenário atual de extrema concorrência. O PostgreSQL é um poderoso sistema gerenciador de banco de dados objeto-relacional de código aberto. Seu recente aumento de popularidade veio de usuários de outros bancos de dados em busca de um sistema com melhores garantias de confiabilidade, melhores recursos de consulta, mais operação previsível, ou simplesmente querendo algo mais fácil de aprender, entender e usar.\nNeste livro, Vinícius Carvalho explora as principais características do PostgreSQL, mostrando por que ele é seguro, poderoso, confiável e rápido. Através do desenvolvimento de um projeto, você vai aprender na prática as funções, consultas e administração de um banco de dados, podendo revisar seus conhecimentos nos exercícios elaborados pelo autor ao fim do livro.','9788555192555','[\"Vinícius Carvalho\"]','https://cdn.shopify.com/s/files/1/0155/7645/products/PostgreSQL_ebook_large.jpg?v=1631652465'),('2','Data Structures and Algorithms in Java','Data Structures and Algorithms in Java, Second Edition is designed to be easy to read and understand although the topic itself is complicated. Algorithms are the procedures that software programs use to manipulate data structures. Besides clear and simple example programs, the author includes a workshop as a small demonstration program executable on a Web browser. The programs demonstrate in graphical form what data structures look like and how they operate. In the second edition, the program is rewritten to improve operation and clarify the algorithms, the example programs are revised to work with the latest version of the Java JDK, and questions and exercises will be added at the end of each chapter making the book even more useful.\nEducational Supplement\nSuggested solutions to the programming projects found at the end of each chapter are made available to instructors at recognized educational institutions. This educational supplement can be found at www.prenhall.com, in the Instructor Resource Center.','9780672324536','[\"Robert Lafore\"]','https://m.media-amazon.com/images/I/41W+LyRF6NL._SX378_BO1,204,203,200_.jpg'),('3','Arquitetura de soluções IoT: Desenvolva com Internet das Coisas para o mundo real','Tudo ao nosso redor está em processo de transformação tecnológica e não é à toa que o termo Internet das Coisas – a IoT – vem ganhando popularidade e atraindo mercado. Há cada vez mais dispositivos com conectividade a um sistema distribuído ou à nuvem, e as possibilidades dessa troca de dados são infinitas. Entretanto, a criação de sistemas profissionais de IoT é complexa e bastante abrangente. Uma solução IoT bem arquitetada exige domínio sobre diferentes áreas de conhecimento, desde hardwares, softwares, protocolos de comunicação, até segurança e sustentabilidade.\nNeste livro, Fernando Ferreira, Renato Manzan e Wellington Duraes expõem conceitos, técnicas e práticas para o desenvolvimento de soluções IoT. Você conhecerá os tipos de dispositivos IoT, suas características e possíveis usos, bem como redes e protocolos que permitem a comunicação com serviços na nuvem. Ao explorar cenários de Internet das Coisas em diferentes negócios, você vai se debruçar sobre diferentes aspectos arquiteturais e seus desafios, como segurança, manutenção, escalabilidade, eficiência, desempenho e disponibilidade. \n','9788555193217','[\"Fernando Ferreira\", \"Renato Manzan\", \"Wellington Duraes\"]','https://cdn.shopify.com/s/files/1/0155/7645/products/p_885765c2-d786-43ae-a589-b37570237537_large.jpg?v=1665717063'),('4','O ladrão de raios: Capa nova: 1','Primeiro volume da saga Percy Jackson e os olimpianos, O ladrão de raios esteve entre os primeiros lugares na lista das séries mais vendidas do The New York Times.\nO autor conjuga lendas da mitologia grega com aventuras no século XXI. Nelas, os deuses do Olimpo continuam vivos, ainda se apaixonam por mortais e geram filhos metade deuses, metade humanos, como os heróis da Grécia antiga. Marcados pelo destino, eles dificilmente passam da adolescência. Poucos conseguem descobrir sua identidade.\nO garoto-problema Percy Jackson é um deles. Tem experiências estranhas em que deuses e monstros mitológicos parecem saltar das páginas dos livros direto para a sua vida. Pior que isso: algumas dessas criaturas estão bastante irritadas. Um artefato precioso foi roubado do Monte Olimpo e Percy é o principal suspeito. Para restaurar a paz, ele e seus amigos – jovens heróis modernos – terão de fazer mais do que capturar o verdadeiro ladrão: precisam elucidar uma traição mais ameaçadora que fúria dos deuses.','9788580575392','[\"Rick Riordan\"]','https://m.media-amazon.com/images/I/51yvcUb5tFL._SX323_BO1,204,203,200_.jpg'),('5','As crônicas de Nárnia - O leão, a feiticeira e o guarda-roupa','Dizem que Aslam está a caminho. Talvez já tenha chegado, sussurrou o Castor. Edmundo experimentou uma misteriosa sensação de horror. Pedro sentiu-se valente e vigoroso. Para Susana, foi como se uma música deliciosa tivesse enchido o ar. E Lúcia teve aquele mesmo sentimento que nos desperta a chegada do verão. Assim, no coração da terra encantada de Nárnia, as crianças lançaram-se na mais excitante e mágica aventura que alguém já escreveu.','9788578270889','[\"C.S. Lewis\"]','https://m.media-amazon.com/images/I/51RpWTEgDvL._SX322_BO1,204,203,200_.jpg'),('6','The Hobbit: The Classic Bestselling Fantasy Novel','This definitive paperback edition features nine illustrations and two maps drawn by J.R.R. Tolkien, and a preface by Christopher Tolkien.','9780261103344','[\"J. R. R. Tolkien\"]','https://m.media-amazon.com/images/I/7103GCFdGDL.jpg');
/*!40000 ALTER TABLE `livros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 12:41:49