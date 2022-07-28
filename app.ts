import path from "path";

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

// locals
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./utils/path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req: any, res: any, next: any) => {
    res.sendStatus(404).sendFile(path.join(rootDir, "views", "404.html"));
});

// customs
// const routes = require("./routes");

// const server = http.createServer(routes);

app.listen(3001);
