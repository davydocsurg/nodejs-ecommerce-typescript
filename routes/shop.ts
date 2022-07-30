import express from "express";
import { getProducts } from "../controller/products";

const router = express.Router();
const adminData = require("./admin");

router.get("/", getProducts);

module.exports = router;
