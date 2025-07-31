/*
  Warnings:

  - You are about to drop the column `createdBy` on the `reciept` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `reciept` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `reciept` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `reciept` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `tnxitem` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `tnxitem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tnxitem` table. All the data in the column will be lost.
  - You are about to drop the column `recieptId` on the `tnxitem` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `tnxitem` table. All the data in the column will be lost.
  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `items` to the `Reciept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `TnxItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeId` to the `TnxItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `Reciept_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `Reciept_tnxId_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `Reciept_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `TnxItem_recieptId_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `TnxItem_transactionId_fkey`;

-- DropIndex
DROP INDEX `Reciept_patientId_fkey` ON `reciept`;

-- DropIndex
DROP INDEX `Reciept_tnxId_fkey` ON `reciept`;

-- DropIndex
DROP INDEX `Reciept_updatedById_fkey` ON `reciept`;

-- DropIndex
DROP INDEX `TnxItem_recieptId_fkey` ON `tnxitem`;

-- DropIndex
DROP INDEX `TnxItem_transactionId_fkey` ON `tnxitem`;

-- AlterTable
ALTER TABLE `reciept` DROP COLUMN `createdBy`,
    DROP COLUMN `date`,
    DROP COLUMN `patientId`,
    DROP COLUMN `updatedById`,
    ADD COLUMN `createdById` VARCHAR(191) NULL,
    ADD COLUMN `items` JSON NOT NULL,
    MODIFY `tnxId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tnxitem` DROP COLUMN `date`,
    DROP COLUMN `method`,
    DROP COLUMN `name`,
    DROP COLUMN `recieptId`,
    DROP COLUMN `type`,
    ADD COLUMN `balance` INTEGER NOT NULL,
    ADD COLUMN `feeId` VARCHAR(191) NOT NULL,
    MODIFY `transactionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `date`,
    ADD COLUMN `number` INTEGER NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `paid` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'payment',
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TnxItem` ADD CONSTRAINT `TnxItem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TnxItem` ADD CONSTRAINT `TnxItem_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `Fees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `TnxItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reciept` ADD CONSTRAINT `Reciept_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reciept` ADD CONSTRAINT `Reciept_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
