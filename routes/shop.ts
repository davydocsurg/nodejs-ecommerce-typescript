import express from "express";
import {
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    getProducts,
    getProductsIndex,
    postCart,
    removeProductFromCart,
} from "../controllers/ShopController";

const shopRoutes = express.Router();

shopRoutes.get("/", getProductsIndex);
shopRoutes.get("/products/:id", getProduct);
shopRoutes.get("/products", getProducts);
shopRoutes.get("/cart", getCart);
shopRoutes.post("/cart", postCart);
shopRoutes.post("/cart-delete-item", removeProductFromCart);
shopRoutes.get("/orders", getOrders);
shopRoutes.get("/checkout", getCheckout);

export default shopRoutes;
