-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `offerId` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `startDate` VARCHAR(255) NOT NULL,
    `endDate` VARCHAR(255) NOT NULL,
    `offerCode` VARCHAR(255) NOT NULL,
    `createDate` VARCHAR(255) NOT NULL,
    `discount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`offerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
