import sequelize from "../config";
import { DataTypes } from "sequelize";



const ticketdeventa = sequelize.define({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    metodoDePago:{type:DataTypes.ENUM('efectivo', 'credito', 'debito', 'transferencia'), allowNull:false},
    precioTotal:{type:DataTypes.DECIMAL(10,2), allowNull:false},
    numeroDeComprobante:{type:DataTypes.STRING(100), allowNull:false, unique:true},
},{
    tableName:"ticketdeventa",
})
export default ticketdeventa