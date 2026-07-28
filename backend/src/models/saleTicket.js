import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

const saleTicket = sequelize.define("saleTicket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    paymentMethod: { type: DataTypes.ENUM('cash', 'credit', 'debit', 'transfer'), allowNull: false },
    totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    receiptNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    idSaleTicketProducts: { type: DataTypes.INTEGER }
}, {
    tableName: "sale_ticket",
});

export default saleTicket;