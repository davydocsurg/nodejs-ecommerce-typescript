import path from "path";
import express from "express";
import bodyParser from "body-parser";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";
import { mongoDBConnection } from "./utils/db";
import authRoutes from "./routes/auth";
import { sessionMiddleware } from "./middleware/session";

mongoDBConnection();

const port = process.env.APP_PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionMiddleware);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);
app.listen(port);
