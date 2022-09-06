import mongoose from "mongoose";
import { mongoDbUrl } from "./constants";

// export const dbConnection = async () => {
//     try {
//         await mongoose.connect(mongoDbUrl);
//         console.log("Database connected successfully");
//     } catch (err) {
//         console.error("Connection refused");
//     }
// };

export const mongoDBConnection = (cb: any) => {
    mongoose
        .connect(mongoDbUrl)
        .then((client) => {
            console.log("Database connected successfully");
            cb(client);
        })
        .catch((err) => {
            console.error(err);
        });
};

// import mysql from "mysql2";
// import { Sequelize } from "sequelize";
// import { db, dbConnection, dbHost, dbUser, port, pwd } from "./constants";

// export const sequelize = new Sequelize("node-test", "root", "root", {
//     dialect: "mysql",
//     host: dbHost,
//     port: port,
// });
