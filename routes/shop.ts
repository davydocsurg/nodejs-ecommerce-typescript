import express from "express";
import {
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    getProducts,
    getProductsIndex,
    postCart,
    postOrder,
    removeProductFromCart,
} from "../controllers/ShopController";

const shopRoutes = express.Router();

// shopRoutes.get("/", getProductsIndex);
// shopRoutes.get("/products/:id", getProduct);
// shopRoutes.get("/products", getProducts);
// shopRoutes.get("/cart", getCart);
// shopRoutes.get("/orders", getOrders);
// shopRoutes.get("/checkout", getCheckout);

// post
shopRoutes.post("/create-order", postOrder);
shopRoutes.post("/cart", postCart);
shopRoutes.post("/cart-delete-item", removeProductFromCart);

export default shopRoutes;
