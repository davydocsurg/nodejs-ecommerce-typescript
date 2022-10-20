import express from "express";
import ProductController from "../controllers/ProductController";
import { catchAsync } from "../helpers/helper";
import isAuthenticated from "../middleware/auth";
import { body, CustomValidator } from "express-validator";

// locals
const adminRoutes = express.Router();

// GET routes
adminRoutes.get(
    "/add-product",
    isAuthenticated,
    catchAsync(ProductController.getAddProductPage)
);
adminRoutes.get(
    "/edit-product/:id",
    isAuthenticated,
    catchAsync(ProductController.getProductEditPage)
);
adminRoutes.get(
    "/products",
    isAuthenticated,
    catchAsync(ProductController.getAdminProducts)
);

// POST routes
adminRoutes.post(
    "/add-product",
    isAuthenticated,
    [
        body("title")
            .isLength({ min: 3, max: 15 })
            .trim()
            .withMessage("Title must be greater than 3 characters"),
        body("descritpion")
            .isLength({ min: 10, max: 250 })
            .trim()
            .withMessage("Description must be between 10 and 250 characters"),
        body("price").isNumeric().trim().withMessage("Price must be a number"),
        body("imageUrl")
            .isURL()
            .trim()
            .withMessage("The image URL must be a valid URL"),
    ],
    catchAsync(ProductController.createProduct)
);

adminRoutes.post(
    "/edit-product",
    isAuthenticated,
    catchAsync(ProductController.updateProduct)
);
adminRoutes.post(
    "/delete-product/:productId",
    isAuthenticated,
    catchAsync(ProductController.deleteProduct)
);

export default adminRoutes;
