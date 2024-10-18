/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Enderecos_Cliente` DROP FOREIGN KEY `Enderecos_Cliente_Cliente_CPF_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_Cliente_CPF_fkey`;

-- AlterTable
ALTER TABLE `Cliente` DROP PRIMARY KEY,
    MODIFY `CPF` CHAR(11) NOT NULL,
    ADD PRIMARY KEY (`CPF`);

-- AlterTable
ALTER TABLE `Enderecos_Cliente` MODIFY `Cliente_CPF` CHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `Pedido` MODIFY `Cliente_CPF` CHAR(11) NOT NULL;

-- AddForeignKey
ALTER TABLE `Enderecos_Cliente` ADD CONSTRAINT `Enderecos_Cliente_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;
