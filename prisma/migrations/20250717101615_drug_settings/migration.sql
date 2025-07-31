/*
  Warnings:

  - You are about to drop the column `drug` on the `drugsinventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[drugId]` on the table `DrugsInventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `drugId` to the `DrugsInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drugsinventory` DROP COLUMN `drug`,
    ADD COLUMN `drugId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Drugs` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DrugsInventory_drugId_key` ON `DrugsInventory`(`drugId`);

-- AddForeignKey
ALTER TABLE `DrugsInventory` ADD CONSTRAINT `DrugsInventory_drugId_fkey` FOREIGN KEY (`drugId`) REFERENCES `Drugs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
