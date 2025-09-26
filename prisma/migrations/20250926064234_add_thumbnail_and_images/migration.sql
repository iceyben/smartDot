/*
  Warnings:

  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isTrending` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to drop the column `isPrimary` on the `productimage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_title_idx` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `createdAt`,
    DROP COLUMN `isNew`,
    DROP COLUMN `isTrending`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `thumbnailUrl` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `productimage` DROP COLUMN `isPrimary`,
    MODIFY `url` VARCHAR(191) NOT NULL;
