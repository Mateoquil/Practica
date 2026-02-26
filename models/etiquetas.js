import sequelize from "../config";
import { DataTypes } from "sequelize";

const etiquetas = sequelize.define({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    tipo:{type:DataTypes.TEXT(50), allowNull:false,unique:true},
},{
    tableName:"etiquetas",
})

export default etiquetas