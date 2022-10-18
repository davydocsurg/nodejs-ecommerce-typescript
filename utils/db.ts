import mongoose from "mongoose";
import { localDB, mongoDbUrl } from "./constants";
import Logging from "../helpers/logs";

export const mongoDBConnection = async () => {
    Logging.info("connecting...");

    try {
        await mongoose.connect(localDB);
        Logging.success(`Database connected successfully`);
    } catch (err) {
        Logging.error(err);
        Logging.error("Connection refused");
    }
};
