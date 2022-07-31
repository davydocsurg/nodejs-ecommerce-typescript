import express from "express";
import { getProducts } from "../controllers/ProductController";

const shopRoutes = express.Router();

shopRoutes.get("/", getProducts);

export default shopRoutes;
