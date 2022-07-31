import express from "express";
import {
    getAddProductPage,
    createProduct,
} from "../controllers/ProductController";
// locals
const adminRoutes = express.Router();

adminRoutes.get("/add-product", getAddProductPage);

adminRoutes.post(`/add-product`, createProduct);

export default adminRoutes;
