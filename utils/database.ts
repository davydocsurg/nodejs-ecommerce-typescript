import mysql from "mysql2";
import { dbHost, dbUser, db, pwd } from "./constants";

const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    database: db,
    password: pwd,
});

module.exports = pool.promise();
