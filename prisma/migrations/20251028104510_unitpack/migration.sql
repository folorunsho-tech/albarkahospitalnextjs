-- DropForeignKey
ALTER TABLE `admission` DROP FOREIGN KEY `Admission_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `Delivery_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugpurchases` DROP FOREIGN KEY `DrugPurchases_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `drugpurchases` DROP FOREIGN KEY `DrugPurchases_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsgiven` DROP FOREIGN KEY `DrugsGiven_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsgiven` DROP FOREIGN KEY `DrugsGiven_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsinventory` DROP FOREIGN KEY `DrugsInventory_drugId_fkey`;

-- DropForeignKey
ALTER TABLE `drugsinventory` DROP FOREIGN KEY `DrugsInventory_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `Encounters_care_id_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `Encounters_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `Encounters_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `followups` DROP FOREIGN KEY `Followups_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `immunization` DROP FOREIGN KEY `Immunization_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `labtest` DROP FOREIGN KEY `LabTest_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `labtest` DROP FOREIGN KEY `LabTest_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `Operations_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `Operations_procedureId_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `Patients_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `Patients_townId_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `Patients_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_tnxId_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionhist` DROP FOREIGN KEY `prescriptionHist_enc_id_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionhist` DROP FOREIGN KEY `prescriptionHist_given_id_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `Reciept_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `Reciept_tnxId_fkey`;

-- DropForeignKey
ALTER TABLE `stockshistory` DROP FOREIGN KEY `StocksHistory_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockshistory` DROP FOREIGN KEY `StocksHistory_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `TnxItem_feeId_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `TnxItem_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_updatedById_fkey`;

-- AlterTable
ALTER TABLE `drugsgiven` ADD COLUMN `package` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `labtest` ADD COLUMN `unit` VARCHAR(191) NULL;

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

-- RenameIndex
ALTER TABLE `_diagnosistoencounters` RENAME INDEX `_DiagnosisToEncounters_AB_unique` TO `_diagnosisToencounters_AB_unique`;

-- RenameIndex
ALTER TABLE `_diagnosistoencounters` RENAME INDEX `_DiagnosisToEncounters_B_index` TO `_diagnosisToencounters_B_index`;

-- RenameIndex
ALTER TABLE `admission` RENAME INDEX `Admission_encounter_id_key` TO `admission_encounter_id_key`;

-- RenameIndex
ALTER TABLE `drugsinventory` RENAME INDEX `DrugsInventory_drugId_key` TO `drugsinventory_drugId_key`;
