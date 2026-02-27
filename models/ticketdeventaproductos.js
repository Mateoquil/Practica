import sequelize from "../config";
import { DataTypes } from "sequelize";

const ticketdeventaproductos = sequelize.define("ticketdeventaproductos",{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    ticketId:{type:DataTypes.INTEGER, allowNull:false},
    productoId:{type:DataTypes.INTEGER, allowNull:false},
    cantidad:{type:DataTypes.INTEGER, allowNull:false},
    precioUnitario:{type:DataTypes.DECIMAL(10,2), allowNull:false},
},{
    tableName:"ticketdeventaproductos",
})

export default ticketdeventaproductos

