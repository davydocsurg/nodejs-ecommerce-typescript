import express from "express";
import ShopController from "../controllers/ShopController";
import { catchAsync } from "../helpers/helper";

const shopRoutes = express.Router();

shopRoutes.route("/products").get(ShopController.getAllProducts);

// shopRoutes.get("/", getProductsIndex);
shopRoutes.route("/products/:id").get(catchAsync(ShopController.getProduct));
// shopRoutes.get("/products", getProducts);
shopRoutes.route("/cart").get(catchAsync(ShopController.getCart));
shopRoutes.route("/orders").get(catchAsync(ShopController.getOrders));
// shopRoutes.get("/checkout", getCheckout);

// post
shopRoutes.route("/create-order").post(catchAsync(ShopController.createOrder));
shopRoutes.route("/cart").post(catchAsync(ShopController.addProdToCart));
shopRoutes
    .route("/cart-delete-item")
    .post(catchAsync(ShopController.deleteItemFromCart));

export default shopRoutes;
