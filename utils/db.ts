import mongoose from "mongoose";
import { localDB, mongoDbUrl } from "./constants";
import chalk from "chalk";

export const mongoDBConnection = async () => {
    console.log("connecting...");

    try {
        await mongoose.connect(localDB);
        console.log(`Database connected successfully`);
        // console.log(chalk.bgGreen("Database connected successfully"));
    } catch (err) {
        console.error(err);
        console.error("Connection refused");
    }
};
