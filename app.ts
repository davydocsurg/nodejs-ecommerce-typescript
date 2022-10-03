import path from "path";
import express, { Request, NextFunction, Response } from "express";
import bodyParser from "body-parser";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";
import { mongoDBConnection } from "./utils/db";
import authRoutes from "./routes/auth";
import { sessionMiddleware } from "./middleware/session";
import { findUserById } from "./helpers/helper";
import User from "./models/User";

const port = process.env.APP_PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionMiddleware);
// app.use(findUserById);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);
app.use((req: Request, res: Response, next: NextFunction) => {
    findUserById(req, next);

    // if (!req?.session) {
    //     return false;
    // }
    // console.log(req.session.user._id);

    // User.findById(req.session.user._id)
    //     .then((user) => {
    //         req.user = user;
    //         console.log(req.user);
    //         next();
    //     })
    //     .catch((err) => {
    //         console.error(err);
    //     });
    console.log(req.user);
});

app.listen(port, () => {
    mongoDBConnection();
});
