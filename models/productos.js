import sequelize from "../config";
import { DataTypes } from "sequelize";

console.log("en teorio deberia haber pasado y por aca")

const Producto = sequelize.define("Producto",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    nombre:{type:DataTypes.TEXT(30), allowNull:false},
    precio:{type:DataTypes.DECIMAL, allowNull:false},
    stock:{type:DataTypes.INTEGER, allowNull:false},
    url:{type:DataTypes.STRING(500), allowNull:false},
    activo:{type:DataTypes.BOOLEAN, defaultValue:true},
    etiquetaId:{type:DataTypes.INTEGER, allowNULL:true},
},{
    tableName:"producto",
})
console.log("en teorio deberia haber pasado por aca")
export default Producto