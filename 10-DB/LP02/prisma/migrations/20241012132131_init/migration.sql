-- CreateTable
CREATE TABLE `Cliente` (
    `CPF` VARCHAR(11) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `DoB` DATETIME(3) NOT NULL,

    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enderecos_Cliente` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Cliente_CPF` VARCHAR(191) NOT NULL,
    `Endereco` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `Cat_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(20) NOT NULL,
    `preco` FLOAT NOT NULL,
    `fabricante` VARCHAR(20) NOT NULL,
    `Cat_Id` INTEGER NOT NULL,
    `SCat_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `N_de_Serie` (
    `Codigo` VARCHAR(20) NOT NULL,
    `Prod_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Cliente_CPF` VARCHAR(191) NOT NULL,
    `End_Id` INTEGER NOT NULL,
    `DH` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Desconto` INTEGER NOT NULL DEFAULT 0,
    `Total` DOUBLE NOT NULL,
    `Pagamento` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido_Produtos` (
    `Prod_Id` INTEGER NOT NULL,
    `Ped_Id` INTEGER NOT NULL,

    PRIMARY KEY (`Prod_Id`, `Ped_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Enderecos_Cliente` ADD CONSTRAINT `Enderecos_Cliente_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_Cat_Id_fkey` FOREIGN KEY (`Cat_Id`) REFERENCES `Categoria`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_Cat_Id_fkey` FOREIGN KEY (`Cat_Id`) REFERENCES `Categoria`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_SCat_Id_fkey` FOREIGN KEY (`SCat_Id`) REFERENCES `SubCategoria`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `N_de_Serie` ADD CONSTRAINT `N_de_Serie_Prod_Id_fkey` FOREIGN KEY (`Prod_Id`) REFERENCES `Produto`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_Cliente_CPF_fkey` FOREIGN KEY (`Cliente_CPF`) REFERENCES `Cliente`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_End_Id_fkey` FOREIGN KEY (`End_Id`) REFERENCES `Enderecos_Cliente`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Produtos` ADD CONSTRAINT `Pedido_Produtos_Prod_Id_fkey` FOREIGN KEY (`Prod_Id`) REFERENCES `Produto`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Produtos` ADD CONSTRAINT `Pedido_Produtos_Ped_Id_fkey` FOREIGN KEY (`Ped_Id`) REFERENCES `Pedido`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
