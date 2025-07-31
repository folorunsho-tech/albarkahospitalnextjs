-- AlterTable
ALTER TABLE `payment` ADD COLUMN `createdById` VARCHAR(191) NULL,
    MODIFY `method` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
