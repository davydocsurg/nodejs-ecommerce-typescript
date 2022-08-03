import express from "express";
import {
    getAddProductPage,
    createProduct,
} from "../controllers/AdminController";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.get("/add-product", getAddProductPage);
adminRoutes.get("/products");

// POST routes
adminRoutes.post(`/add-product`, createProduct);

export default adminRoutes;
