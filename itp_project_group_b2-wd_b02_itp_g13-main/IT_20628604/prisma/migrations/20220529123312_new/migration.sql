-- CreateTable
CREATE TABLE `salary` (
    `empId` INTEGER NOT NULL AUTO_INCREMENT,
    `empname` VARCHAR(255) NOT NULL,
    `empbankacc` VARCHAR(255) NOT NULL,
    `emptype` VARCHAR(255) NOT NULL,
    `basicsalary` VARCHAR(255) NOT NULL,
    `allownce` VARCHAR(255) NOT NULL,
    `numofday` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`empId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
