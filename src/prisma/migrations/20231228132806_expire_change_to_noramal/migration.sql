/*
  Warnings:

  - Made the column `expire` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Token` MODIFY `expire` DATETIME(3) NOT NULL;
