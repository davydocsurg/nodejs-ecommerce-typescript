import express from "express";
import ShopController from "../controllers/ShopController";
import { catchAsync } from "../helpers/helper";

const shopRoutes = express.Router();

shopRoutes.route("/products").get(ShopController.getAllProducts);

// shopRoutes.get("/", getProductsIndex);
shopRoutes.route("/products/:id").get(catchAsync(ShopController.getProduct));
// shopRoutes.get("/products", getProducts);
// shopRoutes.get("/cart", getCart);
// shopRoutes.get("/orders", getOrders);
// shopRoutes.get("/checkout", getCheckout);

// post
// shopRoutes.post("/create-order", postOrder);
// shopRoutes.post("/cart", postCart);
// shopRoutes.post("/cart-delete-item", removeProductFromCart);

export default shopRoutes;
