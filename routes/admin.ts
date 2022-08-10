import express from "express";
import {
    getAddProductPage,
    createProduct,
    getProducts,
    getEditProductPage,
    updateProduct,
} from "../controllers/AdminController";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.get("/add-product", getAddProductPage);
adminRoutes.get("/edit-product/:id", getEditProductPage);
adminRoutes.get("/products", getProducts);

// POST routes
adminRoutes.post(`/add-product`, createProduct);
adminRoutes.post(`/edit-product`, updateProduct);

export default adminRoutes;
