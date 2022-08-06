import express from "express";
import {
    getAddProductPage,
    createProduct,
    getProducts,
} from "../controllers/AdminController";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.get("/add-product", getAddProductPage);
adminRoutes.get("/products", getProducts);

// POST routes
adminRoutes.post(`/add-product`, createProduct);

export default adminRoutes;
