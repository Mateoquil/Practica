import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const tag = sequelize.define('tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING(50), allowNull: false, unique: true, validate: { notEmpty: true } }
}, {
    tableName: 'tags',
    timestamps: false
});

export default tag;