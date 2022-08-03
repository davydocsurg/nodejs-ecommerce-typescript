import express from "express";
import { getProducts } from "../controllers/ShopController";

const shopRoutes = express.Router();

shopRoutes.get("/", getProducts);
shopRoutes.get("/products");
shopRoutes.get("/shop");
shopRoutes.get("/checkout");

export default shopRoutes;
