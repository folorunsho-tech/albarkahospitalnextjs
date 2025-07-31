-- CreateTable
CREATE TABLE `Snapshot` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `data` JSON NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
