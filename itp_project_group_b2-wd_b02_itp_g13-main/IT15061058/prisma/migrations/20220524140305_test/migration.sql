-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('user', 'admin', 'supplier', 'hr', 'finance') NOT NULL DEFAULT 'user';
