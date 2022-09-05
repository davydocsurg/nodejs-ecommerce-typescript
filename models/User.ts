import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});
