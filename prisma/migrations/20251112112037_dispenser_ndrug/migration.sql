-- AlterTable
ALTER TABLE `drugsummary` ADD COLUMN `stockStart` INTEGER NULL;

-- CreateTable
CREATE TABLE `dispensersummary` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `avlStock` INTEGER NULL,
    `input` INTEGER NULL,
    `loss` INTEGER NULL,
    `prescriptions` INTEGER NULL,
    `avlBal` INTEGER NULL,
    `dispenserId` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dispensersummary` ADD CONSTRAINT `dispensersummary_dispenserId_fkey` FOREIGN KEY (`dispenserId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
