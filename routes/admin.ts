import express from "express";
import ProductController from "../controllers/AdminController";
import { catchAsync } from "../helpers/helper";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes
    .route("/add-product")
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
// adminRoutes.post(`/edit-product`, updateProduct);
// adminRoutes.post(`/delete-product`, deleteProduct);

export default adminRoutes;
