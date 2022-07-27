import express from "express";
import path from "path";

const router = express.Router();

router.get("/add-product", (req: any, res: any, next: any) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.post(`/product`, (req: any, res: any, next: any) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;
