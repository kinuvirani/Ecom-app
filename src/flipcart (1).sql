-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 13, 2019 at 12:30 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flipcart`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(10) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `userId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(17, 'a6b5e3d9-3300-4b64-af33-06f472984bb2', 59, 1, '2019-04-12 10:54:05', '2019-04-12 10:54:05'),
(18, 'a6b5e3d9-3300-4b64-af33-06f472984bb2', 81, 1, '2019-04-12 10:54:11', '2019-04-12 10:54:11'),
(19, 'a6b5e3d9-3300-4b64-af33-06f472984bb2', 52, 1, '2019-04-12 10:54:29', '2019-04-12 10:54:29'),
(46, '9328b4e8-89d3-45af-ae22-4bd62a68f7d0', 54, 1, '2019-04-13 11:22:26', '2019-04-13 11:22:26');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `createdAt`, `updatedAt`) VALUES
(1, 'Electronic', '2019-03-29 08:35:06', '2019-03-29 08:36:25'),
(3, 'Men', '2019-03-29 08:44:15', '2019-03-29 08:44:15'),
(4, 'Women', '2019-03-29 12:49:07', '2019-03-29 12:49:07'),
(5, 'TVs & Appliances', '2019-03-29 12:49:22', '2019-03-29 12:49:22'),
(6, 'Baby & Kids', '2019-03-29 12:49:33', '2019-03-29 12:49:33'),
(7, 'Home & Furniture', '2019-03-29 12:49:38', '2019-03-29 12:49:38'),
(8, 'Sports, Books & More', '2019-03-29 12:49:49', '2019-03-29 12:49:49');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

DROP TABLE IF EXISTS `productcategories`;
CREATE TABLE IF NOT EXISTS `productcategories` (
  `productCategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `subCategoryId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `productCategoryName` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productCategoryId`),
  KEY `subCategoryId` (`subCategoryId`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`productCategoryId`, `subCategoryId`, `categoryId`, `productCategoryName`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 1, 1, 'OPPO', 1, '2019-04-03 11:00:03', '2019-04-03 11:00:03'),
(5, 1, 1, 'Vivo', 1, '2019-04-03 11:00:54', '2019-04-03 11:00:54'),
(6, 2, 1, 'Dell', 1, '2019-04-03 11:27:35', '2019-04-03 11:27:35'),
(7, 2, 1, 'HP', 1, '2019-04-03 11:27:40', '2019-04-03 11:27:40'),
(14, 2, 1, 'Lenevo', 1, '2019-04-10 09:54:56', '2019-04-10 09:54:56'),
(16, 4, 1, 'Headphones & Headsets', 1, '2019-04-10 09:57:52', '2019-04-10 09:57:52'),
(17, 4, 1, 'Power Banks', 1, '2019-04-10 09:58:25', '2019-04-10 09:58:25'),
(27, 12, 3, 'Sports T-Shirts', 1, '2019-04-10 10:04:44', '2019-04-10 10:04:44'),
(28, 12, 3, 'Track Suits', 1, '2019-04-10 10:05:10', '2019-04-10 10:05:10'),
(29, 13, 3, 'T-Shirts', 1, '2019-04-10 10:05:48', '2019-04-10 10:05:48'),
(30, 13, 3, 'Kurtas', 1, '2019-04-10 10:06:03', '2019-04-10 10:06:03'),
(31, 14, 3, 'Titan', 1, '2019-04-10 10:06:46', '2019-04-10 10:06:46'),
(32, 15, 4, 'Flats', 1, '2019-04-10 10:08:14', '2019-04-10 10:08:14'),
(33, 15, 4, 'Heels', 1, '2019-04-10 10:08:23', '2019-04-10 10:08:23'),
(35, 16, 4, 'Casual Shoes', 1, '2019-04-10 10:09:03', '2019-04-10 10:09:03'),
(36, 17, 4, 'Fastrack', 1, '2019-04-10 10:10:11', '2019-04-10 10:10:11'),
(37, 17, 4, 'Titan', 1, '2019-04-10 10:10:52', '2019-04-10 10:10:52'),
(41, 19, 4, 'Silver Jewellery', 1, '2019-04-10 10:12:28', '2019-04-10 10:12:28'),
(43, 19, 4, 'Precious Jewellery', 1, '2019-04-10 10:12:59', '2019-04-10 10:12:59'),
(44, 20, 4, 'Smart Bands', 1, '2019-04-10 10:15:11', '2019-04-10 10:15:11'),
(45, 20, 4, 'Wallets & Belts', 1, '2019-04-10 10:15:42', '2019-04-10 10:15:42'),
(47, 8, 5, 'Inverter AC', 1, '2019-04-10 10:27:35', '2019-04-10 10:27:35'),
(48, 8, 5, 'Split ACs', 1, '2019-04-10 10:27:55', '2019-04-10 10:27:55'),
(49, 9, 5, 'Single Door', 1, '2019-04-10 10:28:28', '2019-04-10 10:28:28'),
(50, 9, 5, 'Double Door', 1, '2019-04-10 10:30:15', '2019-04-10 10:30:15'),
(51, 10, 5, 'Electric Kettle', 1, '2019-04-10 10:31:06', '2019-04-10 10:31:06'),
(52, 10, 5, 'Electric Cookers', 1, '2019-04-10 10:31:30', '2019-04-10 10:31:30'),
(53, 10, 5, 'Coffee Makers', 1, '2019-04-10 10:32:03', '2019-04-10 10:32:03'),
(54, 21, 6, 'Polos & T-Shirts', 1, '2019-04-10 10:33:42', '2019-04-10 10:33:42'),
(55, 21, 6, 'Ethnic Wear', 1, '2019-04-10 10:33:55', '2019-04-10 10:33:55'),
(56, 22, 6, 'Dresses & Skirts', 1, '2019-04-10 10:34:17', '2019-04-10 10:34:17'),
(57, 22, 6, 'T-shirts & Tops', 1, '2019-04-10 10:34:39', '2019-04-10 10:34:39'),
(61, 25, 7, 'Water Bottles', 1, '2019-04-10 10:39:11', '2019-04-10 10:39:11'),
(62, 25, 7, 'Lunch Boxes', 1, '2019-04-10 10:39:28', '2019-04-10 10:39:28'),
(64, 26, 7, 'Beds', 1, '2019-04-10 10:40:06', '2019-04-10 10:40:06'),
(65, 26, 7, 'Sofas', 1, '2019-04-10 10:40:17', '2019-04-10 10:40:17'),
(66, 29, 8, 'Business', 1, '2019-04-10 10:41:32', '2019-04-10 10:41:32'),
(67, 29, 8, 'Children', 1, '2019-04-10 10:41:49', '2019-04-10 10:41:49'),
(68, 30, 8, 'Pens', 1, '2019-04-10 10:42:44', '2019-04-10 10:42:44'),
(69, 30, 8, 'Diaries', 1, '2019-04-10 10:43:10', '2019-04-10 10:43:10'),
(70, 31, 8, 'Cricket', 1, '2019-04-10 10:44:00', '2019-04-10 10:44:00'),
(71, 31, 8, 'Badminton', 1, '2019-04-10 10:44:14', '2019-04-10 10:44:14'),
(72, 3, 3, 'Sports Shoes', 1, '2019-04-11 05:40:34', '2019-04-11 05:40:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `productCategoryId` int(11) NOT NULL,
  `subCategoryId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `productBrand` varchar(255) DEFAULT NULL,
  `productPrice` varchar(11) DEFAULT NULL,
  `productDescription` varchar(255) DEFAULT NULL,
  `productImage` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `quantity` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `subCategoryId` (`subCategoryId`),
  KEY `categoryId` (`categoryId`),
  KEY `products_ibfk_1` (`productCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productCategoryId`, `subCategoryId`, `categoryId`, `productName`, `productBrand`, `productPrice`, `productDescription`, `productImage`, `status`, `quantity`, `createdAt`, `updatedAt`) VALUES
(27, 4, 1, 1, 'OPPO A71k', 'OPPO', '8750', 'Your Perfectly Stylish and Comfy Running Partner! These sports shoes are an unquestionable requirement have for each one of those men out there who are wellness monstrosities.', 'o1.jpg,o2.jpg,o3.jpg,o4.jpg,o5.jpg', 1, 7, '2019-04-10 11:38:34', '2019-04-10 11:38:34'),
(29, 6, 2, 1, 'Dell Inspiron ', 'Dell', '20990', 'Pentium Quad Core  \r\n(4 GB/500 GB HDD/Ubuntu) 3552 Laptop  (15.6 inch, Black, 2.1 kg)', 'd5.jpg,d6.jpg,d7.jpg,d8.jpg', 1, 1, '2019-04-10 11:46:38', '2019-04-10 11:46:38'),
(30, 5, 1, 1, 'Vivo Y91', 'Dell', '9990', '(Ocean Blue, 32 GB)  (2 GB RAM)', 'v1.jpg,v2.jpg,v3.jpg,v4.jpg', 1, 1, '2019-04-10 11:49:39', '2019-04-10 11:49:39'),
(44, 72, 3, 3, 'ADIDAS ADIRAY', 'ADIDAS ', '1814', 'If the regular shoes size is 10 for example, for this specific shoe fit go for one size more like 11. \nThese shoes are narrow and people like me with wide feet will feel uncomfortable. ', 'ss3.jpg,ss1.jpg,ss2.jpg,ss4.jpg,ss5.jpg', 1, 5, '2019-04-11 05:41:23', '2019-04-11 05:41:23'),
(45, 47, 8, 5, 'FKAC103SIAINC', 'ADIDAS ', '21499', 'MarQ by Flipkart 1 Ton 3 Star Split Inverter AC - White', 'i2.jpg,i3.jpg,i4.jpg,i5.jpg,i6.jpg', 1, 1, '2019-04-11 05:42:20', '2019-04-11 05:42:20'),
(46, 27, 12, 3, 'Blue T-Shirt', 'Aurro ', '399', 'Soft lightweight catonic polyester with excellent moisture Management properties for comfort & performance Has round neck, short slvs High quality digital print at front to enhance th look of garment Flat lock decorative seaming used throught out Contrast', 'st1.jpg,st2.jpg,st3.jpg,st4.jpg,st5.jpg', 1, 4, '2019-04-11 05:50:52', '2019-04-11 05:50:52'),
(48, 16, 4, 1, 'WI-C600N Headset ', 'Sony ', '10990', 'Whether you want to make your commuting hours more entertaining or spice up your workout sessions, this Sony Bluetooth Headset has got you covered. It’s equipped with 6-mm drivers to deliver clear and powerful sound. ', 'h3.jpg,h4.jpg,h5.jpg', 1, 2, '2019-04-11 05:59:38', '2019-04-11 05:59:38'),
(51, 28, 12, 3, 'Track Suit', 'REEBOK ', '2077', 'Dry in shade, Do not bleach, Machine wash as per tag, Do not Iron on print/embroidery/embellishment', 't1.jpg,t2.jpg,t3.jpg,t4.jpg,t5.jpg,t6.jpg', 1, 10, '2019-04-11 06:09:01', '2019-04-11 06:09:01'),
(52, 29, 13, 3, 'Crew White, Black T-Shirt', 'REEBOK ', '448', 'Look smart and feel comfortable by wearing this white coloured checked T-shirt for men from the house of Maniac.Made from cotton, this T-shirt comes in slim fit and will be comfortable all day long. ', 'ts1.jpg,ts2.jpg,ts3.jpg,ts4.jpg', 1, 1, '2019-04-11 06:12:29', '2019-04-11 06:12:29'),
(53, 30, 13, 3, 'Solid Straight Kurta', 'PEARL OCEAN', '699', 'THE KURTA IS MENS KURTA FOR SUITABLE JEANS, 100% COTTON FABRIC, FOLD SLEEVE SYSTEM,NEHRU COLLAR ', 'k1.jpg,k2.jpg', 1, 8, '2019-04-11 06:14:17', '2019-04-11 06:14:17'),
(54, 7, 2, 1, 'HPIdeapad', 'HP', '58244', 'NA', 'h1.jpg,h2.jpg', 1, 1, '2019-04-11 06:17:47', '2019-04-11 06:17:47'),
(55, 31, 14, 3, 'NH1650YM03 ', 'Titan ', '2445', 'Want to make a statement? You can’t go wrong with this Titan Karishma watch. Everything about this timepiece, from its color to its design, drips opulence.', 'w1.jpg,w2.jpg,w3.jpg,w4.jpg,w5.jpg', 1, 3, '2019-04-11 06:21:09', '2019-04-11 06:21:09'),
(56, 32, 15, 4, 'Women BLACK Flats', 'Casual', '579', 'Miss CL By Carlton London Women BLACK Flats', 'sf4.jpg,sf5.jpg,sf1.jpg', 1, 1, '2019-04-11 06:28:46', '2019-04-11 06:28:46'),
(57, 33, 15, 4, 'Women NUDE Heels', 'Heels', '929', 'Miss CL By Carlton London Women NUDE Heels', 'sh1.jpg,sh2.jpg,sh3.jpg,sh4.jpg', 1, 1, '2019-04-11 06:32:42', '2019-04-11 06:32:42'),
(58, 35, 16, 4, 'Training Shoes', 'Casual', '493', 'Asian Training Shoes,Running Shoes,Gym Shoes,Loafers,Casual Shoes,Canvas Shoes Canvas Shoes For Women  (Multicolor)', 'c1.jpg,c2.jpg,c3.jpg,c4.jpg', 1, 1, '2019-04-11 06:35:24', '2019-04-11 06:35:24'),
(59, 36, 17, 4, 'NG38021PP10CJ Watch ', 'Fastrack ', '795', 'NG38021PP10CJ Tees Watch - For Men & Women', 'fw1.jpg,fw2.jpg,fw3.jpg,fw4.jpg', 1, 1, '2019-04-11 06:39:29', '2019-04-11 06:39:29'),
(60, 37, 17, 4, 'NH1650YM03 Watch ', 'Titan ', '2445', 'Want to make a statement? You can’t go wrong with this Titan Karishma watch. Everything about this timepiece, from its color to its design, drips opulence.', 'w1.jpg,w2.jpg,w3.jpg,w4.jpg,w5.jpg', 1, 1, '2019-04-11 06:40:47', '2019-04-11 06:40:47'),
(61, 41, 19, 4, 'Brass Chain', 'Plated Silver', '282', 'Branded Mens Jewellery Deals in Various products as mentioned earrings for men ear rings for men men stylish earrings for women earrings for women jewellery for men men jewellery chain for men stylish', 'sj1.jpg,sj2.jpg', 1, 1, '2019-04-11 06:46:24', '2019-04-11 06:46:24'),
(62, 43, 19, 4, ' Necklace', 'White Gold', '37500', 'Antara Yellow Gold, White Gold, Rose Gold Italian Necklace Set 18kt NA Earring & Necklace Set', 'pj1.jpg,pj2.jpg,pj3.jpg,pj4.jpg', 1, 1, '2019-04-11 06:48:33', '2019-04-11 06:48:33'),
(64, 45, 20, 4, 'Leather Wallet', 'Casual ', '299', 'BANQLYN Women Casual Pink, White Genuine Leather Wallet  (4 Card Slots)', 'sw1.jpg,sw2.jpg,sw3.jpg', 1, 6, '2019-04-11 06:53:02', '2019-04-11 06:53:02'),
(65, 49, 9, 5, 'Refrigerator  ', 'Whirlpool ', '11740', 'Whirlpool 190 L Direct Cool Single Door 3 Star Refrigerator  (Silver Bliss, WDE 205 CLS PLUS 3S)', 'f1.jpg,f2.jpg,f3.jpg,f4.jpg,f5.jpg,f6.jpg', 1, 1, '2019-04-11 06:56:46', '2019-04-11 06:56:46'),
(66, 51, 10, 5, 'Electric Kettle ', 'Whirlpool ', '649', 'No matter where you are, there is nothing more satisfying than a bowl of delicious soup on a cold, wintry evening. And when you have this electric kettle from Nova at home', 'ek1.jpg,ek2.jpg,ek3.jp.jpeg', 1, 1, '2019-04-11 06:59:56', '2019-04-11 06:59:56'),
(67, 53, 10, 5, ' Coffee Maker', ' Coffee Maker', '299', 'Here comes auto mixing self stirring coffee mug features: With 400ml large capacity Design double insulation With glass cover makes it more convenient to use Please, note: Hand wash only, do not use the dishwasher It can be used in microwave ovens Style', 'cm1.jpg,cm2.jpg,cm3.jpg', 1, 1, '2019-04-11 07:01:54', '2019-04-11 07:01:54'),
(69, 55, 21, 6, 'SHERWANI ', 'SHERWANI ', '265', 'SBN RED SHERWANI WITH DUPPATA Boys Festive & Party Kurta and Pyjama Set  (Maroon Pack of 1)', 'e1.jpg,e2.jpg,e3.jpg', 1, 1, '2019-04-11 07:07:21', '2019-04-11 07:07:21'),
(70, 56, 22, 6, 'Midi', 'KAARIGARI ', '435', 'KAARIGARI presents a beautiful party wear designer collection.Fabric of dress is net and satin.Dress has a colour of combination of off white and turquoise blue colour patchwork of artificial flower.The dress is made for special occasion', 'g1.jpg,g2.jpg,g3.jpg', 1, 1, '2019-04-11 07:10:18', '2019-04-11 07:10:18'),
(72, 62, 25, 7, 'Lunch Box', 'Plastic ', '499', 'This Lunch box is made of high quality plastic materials With its unique design and functionality. The box is leak proof and making it perfect for school going kids boys & girls/colleges and office. The Rectangle Plastic Lunch Box ', 'l3.jpg,l1.jpg,l2.jpg', 1, 1, '2019-04-11 07:15:48', '2019-04-11 07:15:48'),
(73, 65, 26, 7, 'Seater Sofa', 'Seater Sofa', '6,599', 'Perfect Homes by Flipkart Vegas Fabric 1 Seater Sofa  (Finish Color - Brown)', 's1.jpg,s2.jpg,s3.jpg,s4.jpg,s5.jpg', 1, 1, '2019-04-11 07:19:23', '2019-04-11 07:19:23'),
(75, 66, 29, 8, 'Warren Buffett Invests Like a Girl', 'English, Paperback, Lofton LouAnn', '248', 'Investingisn\'t a man\'s world anymore-and the provocative and enlightening WarrenBuffett Invests Like a Girl shows why that\'s a good thing for Wall Street,the global financial system, and your own personal portfolio. ', 'b1.jpg,b2.jpg', 1, 1, '2019-04-11 07:24:12', '2019-04-11 07:24:12'),
(76, 68, 30, 8, 'Pilot pop lol Roller Ball Pen ', 'English, Paperback, Lofton LouAnn', '263', 'Investingisn\'t a man\'s world anymore-and the provocative and enlightening WarrenBuffett Invests Like a Girl shows why that\'s a good thing for Wall Street,the global financial system, and your own personal portfolio. ', 'p1.jpg,p2.jpg,p3.jpg', 1, 1, '2019-04-11 07:26:05', '2019-04-11 07:26:05'),
(77, 69, 30, 8, 'Doodle A5 Diary', 'Love and Laughter Smyth Sewn Diary, Multicolor', '378', 'What is life without love and laughter? Don’t you just love long drives on an endless road, into the horizon, with your significant other', 'd1.jpg,d2.jpg', 1, 1, '2019-04-11 07:27:39', '2019-04-11 07:27:39'),
(78, 70, 31, 8, 'Cricket Bat', ' Multicolor', '649', 'Flipkart SmartBuy Adrenex Poplar Willow SH Cricket Bat - for Tennis Ball  (700 - 1200 g)', 'cb1.jpg,cb2.jpg,cb3.jpg,cb4.jpg', 1, 21, '2019-04-11 07:35:18', '2019-04-11 07:35:18'),
(79, 71, 31, 8, 'Badminton Racquet', ' Multicolor', '1121', 'YONEX achieves precise control over our badminton racquet functions at the molecular Carbonex 7000N', 'bbd2.jpg,bd1.jpg', 1, 1, '2019-04-11 07:36:42', '2019-04-11 07:36:42'),
(80, 14, 2, 1, 'Lenovo Ideapad 330', ' Lenovo ', '58244', 'Core i5 8th Gen - (8 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 330-15ICH Gaming Laptop  (15.6 inch, Onyx Black, 2.2 kg)', 'lp1.jpg,lp2.jpg,lp3.jpg', 1, 1, '2019-04-11 07:38:34', '2019-04-11 07:38:34'),
(81, 44, 20, 4, ' Mi Band', ' Mi ', '1298', 'The Mi Band - HRX Edition is a watch and a fitness tracker built into one smart band. Whether you want to view time or check fitness stats - do all that and more by simply lifting your wrist and tapping the current time button. It\'s as easy as that.', 'bn1.jpg,bn2.jpg,bn3.jpg,bn4.jpg,bn5.jpg', 1, 1, '2019-04-11 07:41:13', '2019-04-11 07:41:13'),
(82, 61, 25, 7, 'Infuser Bottle', 'KAARIGARI ', '199', 'Flipkart SmartBuy fruit Infuser water bottle designed specially for making detox water will not only hydrate you but will also add essential nutrients to your daily lifestyle.', 'bt1.jpg,bt2.jpg,bt3.jpg,bt4.jpg', 1, 1, '2019-04-11 07:43:31', '2019-04-11 07:43:31'),
(83, 64, 26, 7, 'Bed', 'Hydraulic Bed', '24950', 'Royal interiors Metal King Hydraulic Bed  (Finish Color - Black (Mattress Included))', 'bdr1.jpg,bdr2.jpg,bdr3.jpg', 1, 1, '2019-04-11 07:45:43', '2019-04-11 07:45:43'),
(84, 17, 4, 1, 'Mi 10000 mAh', 'Mi', '899', 'Charging Time: 5.83 hrs (Input 5 V/2 A), 4.25 hrs (Input 15 W Max), Dual USB Output, Two Way Quick Charge Support, 9 Layer Circuit Chip Protection, LED Indicator', 'pw1.jpg,pw2.jpg,pw3.jpg,pw4.jpg', 1, 1, '2019-04-11 10:49:16', '2019-04-11 10:49:16');

-- --------------------------------------------------------

--
-- Table structure for table `registerations`
--

DROP TABLE IF EXISTS `registerations`;
CREATE TABLE IF NOT EXISTS `registerations` (
  `register_id` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobileNo` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state1` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`register_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registerations`
--

INSERT INTO `registerations` (`register_id`, `email`, `password`, `firstname`, `lastname`, `mobileNo`, `gender`, `pincode`, `locality`, `address`, `city`, `state1`, `createdAt`, `updatedAt`) VALUES
('0f9a3bfe-19aa-47a5-b575-a6d0cc597f99', 'ankita@gmail.com', 'sha1$5f875f57$1$7eba1e250693917c1504b93bfa38a6c4ecc3fac9', 'Ankita', 'Katyal', '', 'Female', '395006', 'Indian', 'Vesu road', 'Surat', NULL, '2019-03-30 11:52:24', '2019-04-01 09:43:50'),
('2c9152f0-f418-409e-b733-c795d4e01ef7', 'Shikha@gmail.com', 'sha1$5bc7ec62$1$3399fd1766a24b010c35825c932b4658a5929048', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-04 05:13:24', '2019-04-04 05:13:24'),
('2dc19cfc-204b-4193-af9e-ecc1ed462569', 'sana@gmail.com', 'sha1$04c45795$1$73c3eb88dcd903691dc694c82d2446305a908291', 'Sanobar', 'Sheikha', '56768678', '', '395004', 'Indian', 'Adjan Patiya', 'Surat', 'Gujarat', '2019-04-01 06:38:24', '2019-04-01 10:04:47'),
('5ce7f604-bd8d-4cef-98c1-71949e5ad6fb', 'aarti@gmail.com', 'sha1$566117a1$1$d64586446f2c4f2668d8af616b7777f73f0a55eb', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-03 12:57:24', '2019-04-03 12:57:24'),
('6e2ab7f9-157d-4724-8e69-80444c188efb', 'jenny@gmail.com', 'sha1$9979215f$1$8560897181d945ae935deac328b7b835fa753caf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-04 11:31:34', '2019-04-04 11:31:34'),
('87d748b4-6737-4528-bdec-7397b537fa44', 'priya@gmail.com', 'sha1$2904994f$1$20422cce2bb8e69a8a72d0791f3ab0a9f9386324', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-03 08:58:05', '2019-04-03 08:58:05'),
('9328b4e8-89d3-45af-ae22-4bd62a68f7d0', 'kiran@gmail.com', 'sha1$7f91f4d9$1$58506f97c46f99278833ae67f2814ab1f4948c88', 'Kiran', 'Virani', '3444455567', 'Female', '395006', 'Indian', 'Varachha', 'Surat', 'Gujarat', '2019-03-30 09:42:53', '2019-04-01 10:07:04'),
('a6b5e3d9-3300-4b64-af33-06f472984bb2', 'j@happy.com', 'sha1$26b67fb8$1$59eb710ba5199ea82d478404a0c67511b002f507', 'miss', 'j', '101100101001', 'Female', NULL, NULL, NULL, NULL, NULL, '2019-04-12 10:53:32', '2019-04-12 10:55:05'),
('c1413ec2-be8f-48cc-850f-1b3df2e07d77', 'Divya@gmail.com', 'sha1$4fb64756$1$ad947e5d0e0e44aa100e633f8f962bb39ac6c590', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-06 10:51:16', '2019-04-06 10:51:16'),
('d7b10b3e-fddd-4129-95eb-26762ce5c9cf', 'mansi@gmail.com', 'sha1$f15962d1$1$87264893b4f8f353f1efb3c4926e05f1e539e6f1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-04-04 06:10:30', '2019-04-04 06:10:30'),
('ddc9f6e4-5b22-4eb5-8585-c3440b9dd1b2', 'sweety@gmail.com', 'sha1$883331f2$1$d5582609f17234989a665643efdd23d8cae2188b', 'sweety', 'singh', '567889785', 'Female', NULL, NULL, NULL, NULL, NULL, '2019-04-01 05:57:38', '2019-04-01 05:58:18'),
('f92ef0b1-4043-4a3c-b3ea-36038a9f3347', 'nishi@gmail.com', 'sha1$62b313f7$1$e636a05a9569f37a2ef95ecf332680f4089fc65d', 'Nishiii', 'Dalal', '3444455567', 'Female', NULL, NULL, NULL, NULL, NULL, '2019-03-30 11:58:05', '2019-03-30 12:37:04');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
CREATE TABLE IF NOT EXISTS `subcategories` (
  `subCategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `subCategoryName` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`subCategoryId`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`subCategoryId`, `categoryId`, `subCategoryName`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Mobiles', 1, '2019-03-29 08:43:34', '2019-03-29 08:47:17'),
(2, 1, 'Laptops', 1, '2019-03-29 08:45:04', '2019-03-29 08:45:04'),
(3, 3, 'Footwear', 1, '2019-03-29 08:45:44', '2019-03-29 08:45:44'),
(4, 1, 'Mobile Accessories', 1, '2019-04-03 10:44:08', '2019-04-03 10:44:08'),
(8, 5, 'Air Conditioners', 1, '2019-04-03 10:47:08', '2019-04-03 10:47:08'),
(9, 5, 'Refrigerators', 1, '2019-04-03 10:47:22', '2019-04-03 10:47:22'),
(10, 5, 'Kitchen Appliances', 1, '2019-04-03 10:47:54', '2019-04-03 10:47:54'),
(12, 3, 'Sports wear', 1, '2019-04-03 10:49:05', '2019-04-03 10:49:05'),
(13, 3, 'Top wear', 1, '2019-04-03 10:49:32', '2019-04-03 10:49:32'),
(14, 3, 'Watches', 1, '2019-04-03 10:49:59', '2019-04-03 10:49:59'),
(15, 4, 'Sandals', 1, '2019-04-03 10:51:14', '2019-04-03 10:51:14'),
(16, 4, 'Shoes', 1, '2019-04-03 10:51:40', '2019-04-03 10:51:40'),
(17, 4, 'Watches', 1, '2019-04-03 10:52:39', '2019-04-03 10:52:39'),
(19, 4, 'Jewellery', 1, '2019-04-03 10:53:12', '2019-04-03 10:53:12'),
(20, 4, 'Accessories', 1, '2019-04-03 10:53:29', '2019-04-03 10:53:29'),
(21, 6, 'Boys\' Clothing', 1, '2019-04-03 10:54:18', '2019-04-03 10:54:18'),
(22, 6, 'Girls\' Clothing', 1, '2019-04-03 10:54:30', '2019-04-03 10:54:30'),
(25, 7, 'Kitchen Storage', 1, '2019-04-03 10:55:45', '2019-04-03 10:55:45'),
(26, 7, 'Furniture', 1, '2019-04-03 10:56:08', '2019-04-03 10:56:08'),
(29, 8, 'Books', 1, '2019-04-03 10:57:15', '2019-04-03 10:57:15'),
(30, 8, 'Stationery', 1, '2019-04-03 10:57:34', '2019-04-03 10:57:34'),
(31, 8, 'Sports', 1, '2019-04-03 10:57:51', '2019-04-03 10:57:51');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `registerations` (`register_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD CONSTRAINT `productcategories_ibfk_1` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`subCategoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productcategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productCategoryId`) REFERENCES `productcategories` (`productCategoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategories` (`subCategoryId`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
