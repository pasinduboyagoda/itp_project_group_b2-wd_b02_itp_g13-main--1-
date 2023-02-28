/*
  Warnings:

  - You are about to alter the column `firstName` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `lastName` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `supplierEmail` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `supplierNIC` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `CompanyName` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `category` on the `supplier` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `supplier` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `supplierEmail` VARCHAR(191) NOT NULL,
    MODIFY `supplierNIC` VARCHAR(191) NOT NULL,
    MODIFY `CompanyName` VARCHAR(191) NOT NULL,
    MODIFY `PhoneNumber` VARCHAR(191) NOT NULL,
    MODIFY `category` VARCHAR(191) NOT NULL;
