import express from "express";
import ProductController from "../controllers/AdminController";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.route("/add-product").get(ProductController.getAddProductPage);
// adminRoutes.get("/edit-product/:id", getEditProductPage);
// adminRoutes.get("/products", getProducts);

// POST routes
adminRoutes.route("/add-product").post(ProductController.createProduct);

// adminRoutes.post(`/edit-product`, updateProduct);
// adminRoutes.post(`/delete-product`, deleteProduct);

export default adminRoutes;
