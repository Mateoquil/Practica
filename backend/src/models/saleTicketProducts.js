import sequelize from "../database/database.js";
import { DataTypes } from "sequelize";

// TODO (bug fixed here): this was previously defined with the same
// internal name AND tableName as saleTicket.js ("ticketdeventa"),
// causing Sequelize to fight over two definitions for one table.
// That's likely why unrelated ALTER TABLE / DROP FOREIGN KEY statements
// were firing on every server start.
const saleTicketProducts = sequelize.define("saleTicketProducts", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER }
}, {
    tableName: "sale_ticket_products",
});

export default saleTicketProducts;