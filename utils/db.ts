import mysql from "mysql2";
import { db, dbConnection, dbHost, dbUser, port, pwd } from "./constants";

const dbPool = mysql.createPool({
    connectionLimit: dbConnection,
    host: dbHost,
    user: dbUser,
    password: pwd,
    database: db,
    port: port,
});

module.exports = dbPool.promise();
