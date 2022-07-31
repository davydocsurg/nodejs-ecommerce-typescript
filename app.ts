import path from "path";

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

// locals
const shopRoutes = require("./routes/shop");
const rootDir = require("./utils/path");
import adminRoute from "./routes/admin";
import { get404 } from "./controllers/ErrorController";

const app = express();

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use(shopRoutes);

app.use(get404);

// customs
// const routes = require("./routes");

// const server = http.createServer(routes);

app.listen(3001);
