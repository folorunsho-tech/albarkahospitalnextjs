-- DropForeignKey
ALTER TABLE `admission` DROP FOREIGN KEY `admission_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugpurchases` DROP FOREIGN KEY `drugpurchases_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `drugpurchases` DROP FOREIGN KEY `drugpurchases_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsgiven` DROP FOREIGN KEY `drugsgiven_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsgiven` DROP FOREIGN KEY `drugsgiven_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `drugsinventory` DROP FOREIGN KEY `drugsinventory_drugId_fkey`;

-- DropForeignKey
ALTER TABLE `drugsinventory` DROP FOREIGN KEY `drugsinventory_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `encounters_care_id_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `encounters_patient_id_fkey`;

-- DropForeignKey
ALTER TABLE `encounters` DROP FOREIGN KEY `encounters_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `followups` DROP FOREIGN KEY `followups_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `immunization` DROP FOREIGN KEY `immunization_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `labtest` DROP FOREIGN KEY `labtest_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `labtest` DROP FOREIGN KEY `labtest_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `operations_encounter_id_fkey`;

-- DropForeignKey
ALTER TABLE `operations` DROP FOREIGN KEY `operations_procedureId_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_townId_fkey`;

-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_tnxId_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionhist` DROP FOREIGN KEY `prescriptionhist_enc_id_fkey`;

-- DropForeignKey
ALTER TABLE `prescriptionhist` DROP FOREIGN KEY `prescriptionhist_given_id_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `reciept_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `reciept` DROP FOREIGN KEY `reciept_tnxId_fkey`;

-- DropForeignKey
ALTER TABLE `stockshistory` DROP FOREIGN KEY `stockshistory_drug_id_fkey`;

-- DropForeignKey
ALTER TABLE `stockshistory` DROP FOREIGN KEY `stockshistory_updatedById_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `tnxitem_feeId_fkey`;

-- DropForeignKey
ALTER TABLE `tnxitem` DROP FOREIGN KEY `tnxitem_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_updatedById_fkey`;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `Patients_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `Patients_townId_fkey` FOREIGN KEY (`townId`) REFERENCES `town`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `Patients_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `Encounters_care_id_fkey` FOREIGN KEY (`care_id`) REFERENCES `care`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `Encounters_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `encounters` ADD CONSTRAINT `Encounters_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followups` ADD CONSTRAINT `Followups_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `immunization` ADD CONSTRAINT `Immunization_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admission` ADD CONSTRAINT `Admission_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `Delivery_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsgiven` ADD CONSTRAINT `DrugsGiven_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsgiven` ADD CONSTRAINT `DrugsGiven_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `Operations_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operations` ADD CONSTRAINT `Operations_procedureId_fkey` FOREIGN KEY (`procedureId`) REFERENCES `procedures`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labtest` ADD CONSTRAINT `LabTest_encounter_id_fkey` FOREIGN KEY (`encounter_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labtest` ADD CONSTRAINT `LabTest_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tnxitem` ADD CONSTRAINT `TnxItem_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `fees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tnxitem` ADD CONSTRAINT `TnxItem_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `Payment_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `Payment_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `tnxitem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `Payment_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reciept` ADD CONSTRAINT `Reciept_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reciept` ADD CONSTRAINT `Reciept_tnxId_fkey` FOREIGN KEY (`tnxId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsinventory` ADD CONSTRAINT `DrugsInventory_drugId_fkey` FOREIGN KEY (`drugId`) REFERENCES `drugs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugsinventory` ADD CONSTRAINT `DrugsInventory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionhist` ADD CONSTRAINT `prescriptionHist_enc_id_fkey` FOREIGN KEY (`enc_id`) REFERENCES `encounters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionhist` ADD CONSTRAINT `prescriptionHist_given_id_fkey` FOREIGN KEY (`given_id`) REFERENCES `drugsgiven`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockshistory` ADD CONSTRAINT `StocksHistory_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stockshistory` ADD CONSTRAINT `StocksHistory_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugpurchases` ADD CONSTRAINT `DrugPurchases_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `drugpurchases` ADD CONSTRAINT `DrugPurchases_drug_id_fkey` FOREIGN KEY (`drug_id`) REFERENCES `drugsinventory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_diagnosistoencounters` RENAME INDEX `_diagnosisToencounters_AB_unique` TO `_diagnosistoencounters_AB_unique`;

-- RenameIndex
ALTER TABLE `_diagnosistoencounters` RENAME INDEX `_diagnosisToencounters_B_index` TO `_diagnosistoencounters_B_index`;

-- RenameIndex
ALTER TABLE `admission` RENAME INDEX `admission_encounter_id_key` TO `Admission_encounter_id_key`;

-- RenameIndex
ALTER TABLE `delivery` RENAME INDEX `delivery_encounter_id_fkey` TO `Delivery_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `drugpurchases` RENAME INDEX `drugpurchases_createdById_fkey` TO `DrugPurchases_createdById_fkey`;

-- RenameIndex
ALTER TABLE `drugpurchases` RENAME INDEX `drugpurchases_drug_id_fkey` TO `DrugPurchases_drug_id_fkey`;

-- RenameIndex
ALTER TABLE `drugsgiven` RENAME INDEX `drugsgiven_drug_id_fkey` TO `DrugsGiven_drug_id_fkey`;

-- RenameIndex
ALTER TABLE `drugsgiven` RENAME INDEX `drugsgiven_encounter_id_fkey` TO `DrugsGiven_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `drugsinventory` RENAME INDEX `drugsinventory_drugId_key` TO `DrugsInventory_drugId_key`;

-- RenameIndex
ALTER TABLE `drugsinventory` RENAME INDEX `drugsinventory_updatedById_fkey` TO `DrugsInventory_updatedById_fkey`;

-- RenameIndex
ALTER TABLE `encounters` RENAME INDEX `encounters_care_id_fkey` TO `Encounters_care_id_fkey`;

-- RenameIndex
ALTER TABLE `encounters` RENAME INDEX `encounters_patient_id_fkey` TO `Encounters_patient_id_fkey`;

-- RenameIndex
ALTER TABLE `encounters` RENAME INDEX `encounters_updatedById_fkey` TO `Encounters_updatedById_fkey`;

-- RenameIndex
ALTER TABLE `followups` RENAME INDEX `followups_encounter_id_fkey` TO `Followups_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `immunization` RENAME INDEX `immunization_encounter_id_fkey` TO `Immunization_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `labtest` RENAME INDEX `labtest_encounter_id_fkey` TO `LabTest_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `labtest` RENAME INDEX `labtest_test_id_fkey` TO `LabTest_test_id_fkey`;

-- RenameIndex
ALTER TABLE `operations` RENAME INDEX `operations_encounter_id_fkey` TO `Operations_encounter_id_fkey`;

-- RenameIndex
ALTER TABLE `operations` RENAME INDEX `operations_procedureId_fkey` TO `Operations_procedureId_fkey`;

-- RenameIndex
ALTER TABLE `patients` RENAME INDEX `patients_group_id_fkey` TO `Patients_group_id_fkey`;

-- RenameIndex
ALTER TABLE `patients` RENAME INDEX `patients_townId_fkey` TO `Patients_townId_fkey`;

-- RenameIndex
ALTER TABLE `patients` RENAME INDEX `patients_updatedById_fkey` TO `Patients_updatedById_fkey`;

-- RenameIndex
ALTER TABLE `payment` RENAME INDEX `payment_createdById_fkey` TO `Payment_createdById_fkey`;

-- RenameIndex
ALTER TABLE `payment` RENAME INDEX `payment_itemId_fkey` TO `Payment_itemId_fkey`;

-- RenameIndex
ALTER TABLE `payment` RENAME INDEX `payment_tnxId_fkey` TO `Payment_tnxId_fkey`;

-- RenameIndex
ALTER TABLE `prescriptionhist` RENAME INDEX `prescriptionhist_enc_id_fkey` TO `prescriptionHist_enc_id_fkey`;

-- RenameIndex
ALTER TABLE `prescriptionhist` RENAME INDEX `prescriptionhist_given_id_fkey` TO `prescriptionHist_given_id_fkey`;

-- RenameIndex
ALTER TABLE `reciept` RENAME INDEX `reciept_createdById_fkey` TO `Reciept_createdById_fkey`;

-- RenameIndex
ALTER TABLE `reciept` RENAME INDEX `reciept_tnxId_fkey` TO `Reciept_tnxId_fkey`;

-- RenameIndex
ALTER TABLE `stockshistory` RENAME INDEX `stockshistory_drug_id_fkey` TO `StocksHistory_drug_id_fkey`;

-- RenameIndex
ALTER TABLE `stockshistory` RENAME INDEX `stockshistory_updatedById_fkey` TO `StocksHistory_updatedById_fkey`;

-- RenameIndex
ALTER TABLE `tnxitem` RENAME INDEX `tnxitem_feeId_fkey` TO `TnxItem_feeId_fkey`;

-- RenameIndex
ALTER TABLE `tnxitem` RENAME INDEX `tnxitem_transactionId_fkey` TO `TnxItem_transactionId_fkey`;

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `transaction_patientId_fkey` TO `Transaction_patientId_fkey`;

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `transaction_updatedById_fkey` TO `Transaction_updatedById_fkey`;
