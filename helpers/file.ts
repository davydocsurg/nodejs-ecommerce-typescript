import fs from "fs";
import Logging from "../helpers/logs";

export const destroyFile = (filePath: string) => {
    fs.unlink(filePath, (err: unknown) => {
        if (err) {
            Logging.error(err);
        }
    });
};
