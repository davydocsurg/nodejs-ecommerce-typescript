import express from "express";
import ShopController from "../controllers/ShopController";
import { catchAsync } from "../helpers/helper";

const shopRoutes = express.Router();

shopRoutes.route("/products").get(ShopController.getAllProducts);

// shopRoutes.get("/", getProductsIndex);
shopRoutes.route("/products/:id").get(catchAsync(ShopController.getProduct));
// shopRoutes.get("/products", getProducts);
shopRoutes.route("/cart").get(catchAsync(ShopController.getCart));
// shopRoutes.get("/orders", getOrders);
// shopRoutes.get("/checkout", getCheckout);

// post
// shopRoutes.post("/create-order", postOrder);
shopRoutes.route("/cart").post(catchAsync(ShopController.addProdToCart));
// shopRoutes.post("/cart-delete-item", removeProductFromCart);

export default shopRoutes;
