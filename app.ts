import path from "path";
import http from "http";
import express, {
    Express,
    RequestHandler,
    Request,
    Response,
    NextFunction,
    response,
} from "express";
import bodyParser from "body-parser";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";
import { mongoDBConnection } from "./utils/db";
import UserController from "./controllers/UserController";
import User from "./models/User";
import authRoutes from "./routes/auth";

mongoDBConnection();

const port = process.env.APP_PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
    User.findOne().then((user) => {
        if (!user) {
            UserController.createUser(req, res, next);
        }
    });
    User.findById("632448fd88bfd03d61e97417")
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.error(err);
        });
    // UserController.findUserById(req, res, next);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);
app.listen(port);
