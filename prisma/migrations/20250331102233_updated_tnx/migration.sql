/*
  Warnings:

  - You are about to drop the column `number` on the `reciept` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `reciept` DROP COLUMN `number`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `number`;
