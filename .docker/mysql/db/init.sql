CREATE TABLE IF NOT EXISTS `todos` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` text COLLATE utf8_unicode_ci NOT NULL,
    `category` text COLLATE utf8_unicode_ci NOT NULL,
    `completed` boolean DEFAULT 0,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
