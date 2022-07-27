import express from "express";
import path from "path";

const router = express.Router();

router.get("/", (req: any, res: any, next: any) => {
    res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
