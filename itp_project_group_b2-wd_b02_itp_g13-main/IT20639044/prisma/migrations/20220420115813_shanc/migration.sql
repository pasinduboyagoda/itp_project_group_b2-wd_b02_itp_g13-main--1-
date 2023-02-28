-- CreateTable
CREATE TABLE `customerdetail` (
    `cuId` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `roomNum` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `idNum` VARCHAR(255) NOT NULL,
    `contactNum` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`cuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventinformation` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventType` VARCHAR(255) NOT NULL,
    `eventStart` VARCHAR(255) NOT NULL,
    `eventEnd` VARCHAR(255) NOT NULL,
    `numAttendes` VARCHAR(255) NOT NULL,
    `aRequest` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
