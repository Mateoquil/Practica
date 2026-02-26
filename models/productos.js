import sequelize from "../config";
import { DataTypes } from "sequelize";

// CREATE TABLE `Productos` (
//   `id` INT PRIMARY KEY AUTO_INCREMENT,
//   `nombre` VARCHAR(255) NOT NULL,
//   `precio` DECIMAL(10,2) NOT NULL,
//   `stock` INT NOT NULL,
//   `url` VARCHAR(500) NOT NULL,
//   `activo` BOOLEAN DEFAULT TRUE,
//   `etiquetaId` INT,
//   FOREIGN KEY (`etiquetaId`) REFERENCES `etiquetas` (`id`)
// );

const Producto = sequelize.define({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    nombre:{type:DataTypes.TEXT(30), allowNull:false},
    precio:{type:DataTypes.DECIMAL, allowNull:false},
    stock:{type:DataTypes.INTEGER, allowNull:false},
    url:{type:DataTypes.STRING(500), allowNull:false},
    activo:{type:DataTypes.BOOLEAN, defaultValue:true},
    etiquetaId:{type:DataTypes.INTEGER, allowNULL:true},
},{
    tableName:"producto",
}
)

