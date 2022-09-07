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

mongoDBConnection();

const port = process.env.APP_PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(get404);
app.listen(port);
