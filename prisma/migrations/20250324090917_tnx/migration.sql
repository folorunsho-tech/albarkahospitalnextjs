/*
  Warnings:

  - You are about to alter the column `admitted_for` on the `admission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `tnxitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactionhist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tnxitems` DROP FOREIGN KEY `TnxItems_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitems` DROP FOREIGN KEY `TnxItems_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transactionhist` DROP FOREIGN KEY `TransactionHist_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `transactionhist` DROP FOREIGN KEY `TransactionHist_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_updatedById_fkey`;

-- AlterTable
ALTER TABLE `admission` MODIFY `admitted_for` INTEGER NULL;

-- DropTable
DROP TABLE `tnxitems`;

-- DropTable
DROP TABLE `transactionhist`;

-- DropTable
DROP TABLE `transactions`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `patientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TnxItem` (
    `id` VARCHAR(191) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `paid` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'payment',
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `recieptId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reciept` (
    `id` VARCHAR(191) NOT NULL,
    `tnxId` INTEGER NOT NULL,
    `number` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `patientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TnxItem` ADD CONSTRAINT `TnxItem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TnxItem` ADD CONSTRAINT `TnxItem_recieptId_fkey` FOREIGN KEY (`recieptId`) REFERENCES `Reciept`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reciept` ADD CONSTRAINT `Reciept_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reciept` ADD CONSTRAINT `Reciept_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reciept` ADD CONSTRAINT `Reciept_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
