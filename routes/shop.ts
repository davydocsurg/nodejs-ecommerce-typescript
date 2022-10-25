import express from "express";
import ShopController from "../controllers/ShopController";
import { catchAsync } from "../helpers";
import isAuthenticated from "../middleware/auth";

const shopRoutes = express.Router();

shopRoutes.get("/", ShopController.getIndex);
shopRoutes.get("/products", ShopController.getAllProducts);

shopRoutes.get(
    "/products/:id",
    // isAuthenticated,
    catchAsync(ShopController.getProduct)
);
shopRoutes.get("/cart", catchAsync(ShopController.getCart));
shopRoutes.get(
    "/orders",
    isAuthenticated,
    catchAsync(ShopController.getOrders)
);

shopRoutes.get(
    "/orders/:orderId",
    isAuthenticated,
    catchAsync(ShopController.getInvoice)
);

shopRoutes.get(
    "/checkout",
    isAuthenticated,
    catchAsync(ShopController.getCheckout)
);

// post routes
shopRoutes.post(
    "/create-order",
    isAuthenticated,
    catchAsync(ShopController.createOrder)
);
shopRoutes.post(
    "/cart",
    isAuthenticated,
    catchAsync(ShopController.addProdToCart)
);
shopRoutes.post(
    "/cart-delete-item",
    isAuthenticated,
    catchAsync(ShopController.deleteItemFromCart)
);

shopRoutes.post(
    "/checkout",
    isAuthenticated,
    catchAsync(ShopController.checkout)
);

export default shopRoutes;
