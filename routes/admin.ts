import express from "express";
import ProductController from "../controllers/ProductController";
import { catchAsync } from "../helpers/helper";
import isAuthenticated from "../middleware/auth";
// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.get(
    "/add-product",
    // isAuthenticated,
    catchAsync(ProductController.getAddProductPage)
);
adminRoutes.get(
    "/edit-product/:id",
    // isAuthenticated,
    catchAsync(ProductController.getProductEditPage)
);
adminRoutes.get(
    "/products",
    // isAuthenticated,
    catchAsync(ProductController.getAdminProducts)
);

// POST routes
adminRoutes.post(
    "/add-product",
    // isAuthenticated,
    catchAsync(ProductController.createProduct)
);

adminRoutes.post(
    "/edit-product",
    // isAuthenticated,
    catchAsync(ProductController.updateProduct)
);
adminRoutes.post(
    "/delete-product/:productId",
    // isAuthenticated,
    catchAsync(ProductController.deleteProduct)
);

export default adminRoutes;
