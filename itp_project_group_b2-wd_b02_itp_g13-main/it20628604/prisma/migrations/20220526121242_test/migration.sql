-- CreateTable
CREATE TABLE `Deposit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `basic_salary` DOUBLE NOT NULL,
    `allowances` DOUBLE NOT NULL,
    `deductions` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
