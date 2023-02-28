-- CreateTable
CREATE TABLE `stock` (
    `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierName` VARCHAR(255) NOT NULL,
    `orderDate` TIMESTAMP(3) NOT NULL,
    `itemCode` VARCHAR(255) NOT NULL,
    `itemName` VARCHAR(255) NOT NULL,
    `quanitity` VARCHAR(255) NOT NULL,
    `unitePrice` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `supplierId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `supplierEmail` VARCHAR(255) NOT NULL,
    `supplierNIC` VARCHAR(255) NOT NULL,
    `CompanyName` VARCHAR(255) NOT NULL,
    `PhoneNumber` INTEGER NOT NULL,
    `category` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`supplierId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
