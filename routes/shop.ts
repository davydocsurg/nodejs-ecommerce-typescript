import express from "express";
import {
    getCart,
    getCheckout,
    getProducts,
    getProductsIndex,
} from "../controllers/ShopController";

const shopRoutes = express.Router();

shopRoutes.get("/", getProductsIndex);
shopRoutes.get("/products", getProducts);
shopRoutes.get("/cart", getCart);
shopRoutes.get("/checkout", getCheckout);

export default shopRoutes;
