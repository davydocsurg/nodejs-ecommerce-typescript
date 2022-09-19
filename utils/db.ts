import mongoose from "mongoose";
import { mongoDbUrl } from "./constants";

export const mongoDBConnection = async () => {
    try {
        await mongoose.connect(mongoDbUrl);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
        console.error("Connection refused");
    }
};

// let _db: any;

// export const mongoDBConnection = (cb: Function) => {
//     mongoose
//         .connect(mongoDbUrl)
//         .then((client) => {
//             console.log("Database connected successfully");
//             _db = client.db();
//             cb();
//         })
//         .catch((err) => {
//             console.error(err);
//             throw err;
//         });
// };

// export const getDb = () => {
//     if (_db) {
//         return _db;
//     }

//     throw "No database found";
// };

// import mysql from "mysql2";
// import { Sequelize } from "sequelize";
// import { db, dbConnection, dbHost, dbUser, port, pwd } from "./constants";

// export const sequelize = new Sequelize("node-test", "root", "root", {
//     dialect: "mysql",
//     host: dbHost,
//     port: port,
// });
