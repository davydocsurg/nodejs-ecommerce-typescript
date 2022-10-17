import mongoose from "mongoose";
import { localDB, mongoDbUrl } from "./constants";
import chalk from "chalk";
import Logging from "../helpers/logs";

export const mongoDBConnection = async () => {
    console.log("connecting...");
    // Logging.info("connecting...");

    try {
        await mongoose.connect(localDB);
        console.log(`Database connected successfully`);
        // console.log(chalk.bgGreen("Database connected successfully"));
    } catch (err) {
        console.error(err);
        console.error("Connection refused");
    }
};
