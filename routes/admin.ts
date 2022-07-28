import express from "express";
import path from "path";

// locals
const rootDir = require("../utils/path");

const router = express.Router();

const products: Array<any> = [];

router.get("/add-product", (req: any, res: any, next: any) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post(`/add-product`, (req: any, res: any, next: any) => {
    products.push({ title: req.body.title });
    res.redirect("/");
});

// module.exports = {
//     router,
//     products,
// };

exports.routes = router;
exports.products = products;
