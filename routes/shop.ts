import express from "express";
import path from "path";

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req: any, res: any, next: any) => {
    console.log(adminData.products);
    const products = adminData.products;

    res.render("shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/admin/shop",
    });
    // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
