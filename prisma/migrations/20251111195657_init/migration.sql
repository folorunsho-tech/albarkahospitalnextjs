-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `passHash` VARCHAR(191) NULL,
    `menu` JSON NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` VARCHAR(191) NOT NULL,
    `hosp_no` VARCHAR(191) NOT NULL,
    `no` INTEGER NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `sex` VARCHAR(191) NULL,
    `age` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NULL,
    `religion` VARCHAR(191) NULL,
    `phone_no` VARCHAR(191) NULL,
    `reg_date` DATETIME(3) NULL,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `group_id` VARCHAR(191) NULL,
    `townId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `encounters` (
    `id` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `enc_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time` VARCHAR(191) NULL,
    `admitted` BOOLEAN NOT NULL DEFAULT false,
    `outcome` VARCHAR(191) NULL,
    `care_id` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followups` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `immunization` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `next_date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admission` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `adm_date` DATETIME(3) NULL,
    `admitted_for` INTEGER NULL,
    `discharged_on` DATETIME(3) NULL,
    `nok_phone` VARCHAR(191) NULL,
    `ward_matron` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admission_encounter_id_key`(`encounter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anc` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `ega` VARCHAR(191) NULL,
    `fe_no` VARCHAR(191) NULL,
    `fe_liq_vol` VARCHAR(191) NULL,
    `fe_abnormality` VARCHAR(191) NULL,
    `fe_diagnosis` VARCHAR(191) NULL,
    `fe_live` VARCHAR(191) NULL,
    `placenta_pos` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `edd` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `parity` VARCHAR(191) NULL,
    `mother_diag` VARCHAR(191) NULL,
    `mother_outcome` VARCHAR(191) NULL,
    `labour_duration` VARCHAR(191) NULL,
    `delivery_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delivery_type` VARCHAR(191) NULL,
    `placenta_delivery` VARCHAR(191) NULL,
    `apgar_score` VARCHAR(191) NULL,
    `baby_maturity` VARCHAR(191) NULL,
    `baby_weight` VARCHAR(191) NULL,
    `baby_sex` VARCHAR(191) NULL,
    `baby_outcome` VARCHAR(191) NULL,
    `congenital_no` INTEGER NULL,
    `midwife` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugsgiven` (
    `id` VARCHAR(191) NOT NULL,
    `rate` INTEGER NULL DEFAULT 0,
    `price` INTEGER NULL DEFAULT 0,
    `quantity` INTEGER NULL DEFAULT 0,
    `drug_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `package` VARCHAR(191) NULL,
    `encounter_id` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operations` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `procedureId` VARCHAR(191) NULL,
    `proc_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `surgeon` VARCHAR(191) NULL,
    `assistant` VARCHAR(191) NULL,
    `outcome` VARCHAR(191) NULL,
    `anaesthesia` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labtest` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `test_id` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NULL,
    `rate` INTEGER NULL,
    `info` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
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
CREATE TABLE `tnxitem` (
    `id` VARCHAR(191) NOT NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `feeId` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `paid` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` VARCHAR(191) NOT NULL,
    `tnxId` VARCHAR(191) NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `paid` INTEGER NOT NULL,
    `method` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'payment',
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reciept` (
    `id` VARCHAR(191) NOT NULL,
    `items` JSON NOT NULL,
    `tnxId` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugsummary` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `totalSGain` INTEGER NULL,
    `totalSLoss` INTEGER NULL,
    `prescriptions` INTEGER NULL,
    `encounters` INTEGER NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugsinventory` (
    `id` VARCHAR(191) NOT NULL,
    `stock_qty` INTEGER NOT NULL DEFAULT 0,
    `added` INTEGER NULL DEFAULT 0,
    `rate` INTEGER NULL DEFAULT 0,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `drugId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `drugsinventory_drugId_key`(`drugId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptionhist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drug` VARCHAR(191) NOT NULL,
    `hosp_no` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `rate` INTEGER NULL DEFAULT 0,
    `price` INTEGER NULL DEFAULT 0,
    `stock_remain` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `given_id` VARCHAR(191) NULL,
    `enc_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stockshistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drug_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `stock_qty` INTEGER NULL,
    `added` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugpurchases` (
    `id` VARCHAR(191) NOT NULL,
    `drug_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `price` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `time` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugs` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnosis` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `town` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tests` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedures` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fees` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `amount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `care` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_diagnosisToencounters` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_diagnosisToencounters_AB_unique`(`A`, `B`),
    INDEX `_diagnosisToencounters_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_townId_fkey` FOREIGN KEY (`townId`) REFERENCES `town`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `encounters_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `encounters_care_id_fkey` FOREIGN KEY (`care_id`) REFERENCES `care`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `encounters_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followups` ADD CONSTRAINT `followups_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immunization` ADD CONSTRAINT `immunization_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `admission_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anc` ADD CONSTRAINT `anc_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsgiven` ADD CONSTRAINT `drugsgiven_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsgiven` ADD CONSTRAINT `drugsgiven_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `operations_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `operations_procedureId_fkey` FOREIGN KEY (`procedureId`) REFERENCES `procedures`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labtest` ADD CONSTRAINT `labtest_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labtest` ADD CONSTRAINT `labtest_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tnxitem` ADD CONSTRAINT `tnxitem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tnxitem` ADD CONSTRAINT `tnxitem_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `fees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `tnxitem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reciept` ADD CONSTRAINT `reciept_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reciept` ADD CONSTRAINT `reciept_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsinventory` ADD CONSTRAINT `drugsinventory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsinventory` ADD CONSTRAINT `drugsinventory_drugId_fkey` FOREIGN KEY (`drugId`) REFERENCES `drugs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionhist` ADD CONSTRAINT `prescriptionhist_given_id_fkey` FOREIGN KEY (`given_id`) REFERENCES `drugsgiven`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionhist` ADD CONSTRAINT `prescriptionhist_enc_id_fkey` FOREIGN KEY (`enc_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockshistory` ADD CONSTRAINT `stockshistory_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockshistory` ADD CONSTRAINT `stockshistory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugpurchases` ADD CONSTRAINT `drugpurchases_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugpurchases` ADD CONSTRAINT `drugpurchases_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_diagnosisToencounters` ADD CONSTRAINT `_diagnosisToencounters_A_fkey` FOREIGN KEY (`A`) REFERENCES `diagnosis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_diagnosisToencounters` ADD CONSTRAINT `_diagnosisToencounters_B_fkey` FOREIGN KEY (`B`) REFERENCES `encounters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
