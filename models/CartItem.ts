import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

export const CartItem = sequelize.define("cartItem", {
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
