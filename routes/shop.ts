import express from "express";
import path from "path";

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req: any, res: any, next: any) => {
    console.log(adminData.products);
    res.render("shop");
    // res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
