import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

const product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING(500), allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    idSaleTicketProducts: { type: DataTypes.INTEGER }
}, {
    tableName: "product",
});

export default product;