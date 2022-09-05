import mysql from "mysql2";
import { Sequelize } from "sequelize";
import { db, dbConnection, dbHost, dbUser, port, pwd } from "./constants";

export const sequelize = new Sequelize("node-test", "root", "root", {
    dialect: "mysql",
    host: dbHost,
    port: port,
});

// const dbPool = mysql.createPool({
//     connectionLimit: dbConnection,
//     host: dbHost,
//     user: dbUser,
//     password: pwd,
//     database: db,
//     port: port,
// });

// module.exports = dbPool.promise();
