import express from "express";
import path from "path";
import {
    getAddProductPage,
    createProduct,
} from "../controllers/ProductController";
// locals
const adminRoute = express.Router();

adminRoute.get("/add-product", getAddProductPage);

adminRoute.post(`/add-product`, createProduct);

export default adminRoute;
