-- DropForeignKey
ALTER TABLE `Enderecos_Cliente` DROP FOREIGN KEY `Enderecos_Cliente_Cliente_CPF_fkey`;

-- DropForeignKey
ALTER TABLE `Pedido` DROP FOREIGN KEY `Pedido_Cliente_CPF_fkey`;

-- AlterTable
ALTER TABLE `Enderecos_Cliente` MODIFY `Cliente_CPF` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Pedido` MODIFY `Cliente_CPF` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Enderecos_Cliente` ADD CONSTRAINT `Enderecos_Cliente_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;
