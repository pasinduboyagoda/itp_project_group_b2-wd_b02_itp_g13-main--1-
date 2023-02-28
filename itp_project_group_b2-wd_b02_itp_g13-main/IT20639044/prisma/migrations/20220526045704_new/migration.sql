/*
  Warnings:

  - You are about to drop the `customerdetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventinformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `customerdetail`;

-- DropTable
DROP TABLE `eventinformation`;

-- CreateTable
CREATE TABLE `parkingdetail` (
    `parkId` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `veicleType` VARCHAR(255) NOT NULL,
    `vehicleregNum` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `idNum` VARCHAR(255) NOT NULL,
    `contactNum` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`parkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pooldetail` (
    `poolId` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `numAttendance` VARCHAR(255) NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `time` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`poolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
