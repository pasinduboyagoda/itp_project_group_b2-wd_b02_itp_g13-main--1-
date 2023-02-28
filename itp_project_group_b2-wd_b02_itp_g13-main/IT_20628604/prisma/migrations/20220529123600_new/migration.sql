/*
  Warnings:

  - You are about to drop the column `basicsalary` on the `salary` table. All the data in the column will be lost.
  - Added the required column `basicsal` to the `salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salary` DROP COLUMN `basicsalary`,
    ADD COLUMN `basicsal` VARCHAR(255) NOT NULL;
