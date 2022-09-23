import Product from "../models/Product";
import { NextFunction, Request, Response } from "express";
import { getOne } from "./HandlerFactory";
import Order from "../models/Order";
import { OrderType } from "../types/order";

class ShopController {
    constructor() {
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.addProdToCart = this.addProdToCart.bind(this);
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find().populate("userId");

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
            isAuthenticated: req.isLoggedIn,
        });
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        const product = await getOne(Product, req, res, next);
        // console.log(query);

        res.render("shop/product-detail", {
            product: product,
            pageTitle: product?.title ? product?.title : "Product",
            path: "/products",
            isAuthenticated: req.isLoggedIn,
        });
    }

    async addProdToCart(req: Request, res: Response, next: NextFunction) {
        const prodId = req.body.id.trim();

        const product = await Product.findById(prodId);
        // const product = await getOne(Product, req, res, next);

        req.user.addToCart(product);

        res.redirect("/cart");
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        const cartProds = await req.user.populate("cart.items");
        console.log(cartProds);

        const prods = cartProds.cart.items;

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: prods,
            isAuthenticated: req.isLoggedIn,
        });
    }

    async deleteItemFromCart(req: Request, res: Response, next: NextFunction) {
        const prodId = req.body.productId.trim();

        await req.user.removeFromCart(prodId);

        res.redirect("/cart");
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        const orders = await req.user.populate("cart");

        const products = orders.cart.items.map((d: OrderType) => {
            return {
                quantity: d.quantity,
                product: { ...d.productId },
            };
        });

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user,
            },
            products: products,
        });
        order.save();

        req.user.clearCart();

        return res.redirect("/orders");
        // TODO: create custom routes
    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        const orders = await Order.find({
            "user.userId": req.user._id,
        });

        res.render("shop/orders", {
            path: "/orders",
            pageTitle: "Your Orders",
            orders: orders,
            isAuthenticated: req.isLoggedIn,
        });
    }
}

export default new ShopController();
