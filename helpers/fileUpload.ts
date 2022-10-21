import { Request } from "express";
import multer from "multer";

export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, "public/products/images");
    },

    filename: (req: Request, file: any, cb: Function) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const fileValidation = (req: Request, file: any, cb: Function) => {
    let fileMimetype = "image/png" || "image/jpg" || "image/jpeg";
    if (file.mimetype == "image/png" || "image/jpg" || "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
