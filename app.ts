import path from "path";
import express, { Request, NextFunction, Response } from "express";
import bodyParser from "body-parser";
import flashMsg from "connect-flash";
import csurf from "csurf";
import multer from "multer";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";
import { mongoDBConnection } from "./utils/db";
import authRoutes from "./routes/auth";
import { sessionMiddleware } from "./middleware/session";
import { authCheck, findUserById } from "./helpers/helper";
import User from "./models/User";
import { csrfSetup } from "./helpers/helper";
import Logging from "./helpers/logs";
import MailService from "./services/mailServices";
import { fileStorage, fileValidation } from "./helpers/fileUpload";

const port = process.env.APP_PORT || 3001;

const app = express();
const csrfProtection = csurf();

app.set("view engine", "ejs");

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileValidation }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
// serve images
app.use(
    "/public/products/images",
    express.static(path.join(__dirname, "public/products/images"))
);
app.use(csrfProtection);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);
app.use(flashMsg());
app.use(authCheck);
app.use((req: Request, res: Response, next: NextFunction) => {
    findUserById(req, next);
});
app.use((req: Request, res: Response, next: NextFunction) => {
    User.findById(req.session.user._id)
        .then((user) => {
            console.log(user);

            req.user = user;
            next();
        })
        .catch((err) => {
            console.error(err);
        });
});
app.use((req: Request, res: Response, next: NextFunction) => {
    csrfSetup(req, res, next);
});

app.listen(port, () => {
    MailService.createConnection();
    mongoDBConnection();
});
