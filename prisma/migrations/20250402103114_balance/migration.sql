/*
  Warnings:

  - You are about to drop the column `price` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `reciept` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `reciept` DROP COLUMN `total`;

-- AlterTable
ALTER TABLE `tnxitem` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
