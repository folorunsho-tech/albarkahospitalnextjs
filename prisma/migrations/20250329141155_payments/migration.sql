-- AlterTable
ALTER TABLE `payment` ADD COLUMN `tnxId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
