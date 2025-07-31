-- CreateTable
CREATE TABLE `Accounts` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `passHash` VARCHAR(191) NULL,
    `menu` JSON NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthHistory` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NULL,
    `loggedInAt` DATETIME(3) NULL,
    `loggedOutAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patients` (
    `id` VARCHAR(191) NOT NULL,
    `hosp_no` VARCHAR(191) NOT NULL,
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
CREATE TABLE `Encounters` (
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
CREATE TABLE `Followups` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Immunization` (
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
CREATE TABLE `Admission` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `adm_date` DATETIME(3) NULL,
    `admitted_for` VARCHAR(191) NULL,
    `discharged_on` DATETIME(3) NULL,
    `nok_phone` VARCHAR(191) NULL,
    `ward_matron` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admission_encounter_id_key`(`encounter_id`),
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
CREATE TABLE `Delivery` (
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
CREATE TABLE `DrugsGiven` (
    `id` VARCHAR(191) NOT NULL,
    `rate` INTEGER NULL DEFAULT 0,
    `price` INTEGER NULL DEFAULT 0,
    `quantity` INTEGER NULL DEFAULT 0,
    `drug_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `encounter_id` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operations` (
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
CREATE TABLE `LabTest` (
    `id` VARCHAR(191) NOT NULL,
    `encounter_id` VARCHAR(191) NULL,
    `test_id` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NULL,
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
CREATE TABLE `Transactions` (
    `id` VARCHAR(191) NOT NULL,
    `method` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `total` INTEGER NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `patient_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionHist` (
    `id` VARCHAR(191) NOT NULL,
    `items` JSON NULL,
    `method` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `total` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TnxItems` (
    `id` VARCHAR(191) NOT NULL,
    `hosp_no` VARCHAR(191) NULL,
    `patient_name` VARCHAR(191) NULL,
    `item_id` VARCHAR(191) NULL,
    `amount` INTEGER NULL DEFAULT 0,
    `paid` INTEGER NULL DEFAULT 0,
    `method` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `year` INTEGER NULL,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `transactionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrugsInventory` (
    `id` VARCHAR(191) NOT NULL,
    `drug` VARCHAR(191) NULL,
    `stock_qty` INTEGER NOT NULL DEFAULT 0,
    `added` INTEGER NULL DEFAULT 0,
    `rate` INTEGER NULL DEFAULT 0,
    `createdById` VARCHAR(191) NULL,
    `updatedById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptionHist` (
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
CREATE TABLE `StocksHistory` (
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
CREATE TABLE `DrugPurchases` (
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
CREATE TABLE `Diagnosis` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Town` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tests` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Procedures` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fees` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `amount` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Care` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DiagnosisToEncounters` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DiagnosisToEncounters_AB_unique`(`A`, `B`),
    INDEX `_DiagnosisToEncounters_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthHistory` ADD CONSTRAINT `AuthHistory_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patients` ADD CONSTRAINT `Patients_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patients` ADD CONSTRAINT `Patients_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patients` ADD CONSTRAINT `Patients_townId_fkey` FOREIGN KEY (`townId`) REFERENCES `Town`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encounters` ADD CONSTRAINT `Encounters_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encounters` ADD CONSTRAINT `Encounters_care_id_fkey` FOREIGN KEY (`care_id`) REFERENCES `Care`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Encounters` ADD CONSTRAINT `Encounters_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Followups` ADD CONSTRAINT `Followups_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Immunization` ADD CONSTRAINT `Immunization_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admission` ADD CONSTRAINT `Admission_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anc` ADD CONSTRAINT `anc_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrugsGiven` ADD CONSTRAINT `DrugsGiven_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `DrugsInventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrugsGiven` ADD CONSTRAINT `DrugsGiven_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operations` ADD CONSTRAINT `Operations_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operations` ADD CONSTRAINT `Operations_procedureId_fkey` FOREIGN KEY (`procedureId`) REFERENCES `Procedures`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabTest` ADD CONSTRAINT `LabTest_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LabTest` ADD CONSTRAINT `LabTest_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `Tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `Patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHist` ADD CONSTRAINT `TransactionHist_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHist` ADD CONSTRAINT `TransactionHist_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TnxItems` ADD CONSTRAINT `TnxItems_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Fees`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TnxItems` ADD CONSTRAINT `TnxItems_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrugsInventory` ADD CONSTRAINT `DrugsInventory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionHist` ADD CONSTRAINT `prescriptionHist_given_id_fkey` FOREIGN KEY (`given_id`) REFERENCES `DrugsGiven`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionHist` ADD CONSTRAINT `prescriptionHist_enc_id_fkey` FOREIGN KEY (`enc_id`) REFERENCES `Encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StocksHistory` ADD CONSTRAINT `StocksHistory_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `DrugsInventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StocksHistory` ADD CONSTRAINT `StocksHistory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrugPurchases` ADD CONSTRAINT `DrugPurchases_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `DrugsInventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrugPurchases` ADD CONSTRAINT `DrugPurchases_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `Accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiagnosisToEncounters` ADD CONSTRAINT `_DiagnosisToEncounters_A_fkey` FOREIGN KEY (`A`) REFERENCES `Diagnosis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiagnosisToEncounters` ADD CONSTRAINT `_DiagnosisToEncounters_B_fkey` FOREIGN KEY (`B`) REFERENCES `Encounters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
