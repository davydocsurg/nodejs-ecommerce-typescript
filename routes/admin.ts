import express from "express";
import path from "path";

// locals
const rootDir = require("../utils/path");

const router = express.Router();

const products: Array<any> = [];

router.get("/add-product", (req: any, res: any, next: any) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
});

router.post(`/add-product`, (req: any, res: any, next: any) => {
    products.push({ title: req.body.title });
    res.redirect("/");
});

exports.routes = router;
exports.products = products;
