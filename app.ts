import path from "path";
import http from "http";
import express, {
    Express,
    RequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";
import bodyParser from "body-parser";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";

// database
import * as MySQLConnector from "./utils/mysql.database";
import * as ProductService from "./products/products.services";
const db = require("./utils/db");
import { sequelize } from "./utils/db";

const port = process.env.APP_PORT || 3001;

const app = express();

// MySQLConnector.init();

// db.execute("SELECT * FROM products")
//     .then((result: any) => {
//         console.log(result);
//     })
//     .catch((err: any) => {
//         console.error(err);
//     });

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

// customs
// const routes = require("./routes");

// const server = http.createServer(routes);
sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
