import express from "express";
import ProductController from "../controllers/ProductController";
import { catchAsync } from "../helpers/helper";
import { isAuthenticated } from "../middleware/auth";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes
    .route("/add-product", isAuthenticated)
    .get(catchAsync(ProductController.getAddProductPage));
adminRoutes
    .route("/edit-product/:id")
    .get(catchAsync(ProductController.getProductEditPage));
adminRoutes
    .route("/products")
    .get(catchAsync(ProductController.getAdminProducts));

// POST routes
adminRoutes
    .route("/add-product")
    .post(catchAsync(ProductController.createProduct));

adminRoutes
    .route("/edit-product")
    .post(catchAsync(ProductController.updateProduct));
adminRoutes
    .route("/delete-product/:productId")
    .post(catchAsync(ProductController.deleteProduct));

export default adminRoutes;
