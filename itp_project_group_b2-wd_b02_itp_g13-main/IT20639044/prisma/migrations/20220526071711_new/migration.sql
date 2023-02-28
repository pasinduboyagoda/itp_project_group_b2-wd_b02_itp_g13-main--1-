/*
  Warnings:

  - You are about to drop the column `veicleType` on the `parkingdetail` table. All the data in the column will be lost.
  - Added the required column `vehicleType` to the `parkingdetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parkingdetail` DROP COLUMN `veicleType`,
    ADD COLUMN `vehicleType` VARCHAR(255) NOT NULL;
