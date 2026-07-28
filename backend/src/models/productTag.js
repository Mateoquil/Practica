import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const productTag = sequelize.define('productTag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    tagId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'product_tag',
    timestamps: false
});

export default productTag;