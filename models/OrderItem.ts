import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export const OrderItem = sequelize.define("orderItem", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    quantity: {
        type: DataTypes.INTEGER,
    },
});
