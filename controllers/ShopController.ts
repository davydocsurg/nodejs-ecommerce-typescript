import Product from "../models/Product";
import { NextFunction, Request, Response } from "express";
import { getOne } from "./HandlerFactory";
import Order from "../models/Order";
import { OrderType } from "../interfaces/order";
import { authCheck } from "../helpers/helper";
import fs from "fs";
import path from "path";
import Logging from "../helpers/logs";

class ShopController {
    constructor() {
        this.getIndex = this.getIndex.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.addProdToCart = this.addProdToCart.bind(this);
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    async getIndex(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find({
            userId: req.session.user?._id,
        }).populate("userId");

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find();

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        const product = await getOne(Product, req, res, next);
        // console.log(query);

        res.render("shop/product-detail", {
            product: product,
            pageTitle: product?.title ? product?.title : "Product",
            path: "/products",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async addProdToCart(req: Request, res: Response, next: NextFunction) {
        const prodId = req.body.id.trim();

        const product = await Product.findById(prodId);
        // req.user = req.session.user;
        req.user.addToCart(product);

        res.redirect("/cart");
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        const cartProds = await req.user.populate("cart.items");

        const prods = cartProds.cart.items;

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: prods,
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
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
                product: { ...d.product },
            };
        });

        const order = new Order({
            user: {
                email: req.user.email,
                userId: req.user,
            },
            products: products,
        });
        await order.save();

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
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async getInvoice(req: Request, res: Response, next: NextFunction) {
        const orderId = req.params.orderId;
        const order = await Order.findById(orderId);
        if (!order) {
            return Logging.warn("No orders found");
        }
        if (order.user?.userId.toString() !== req.user._id.toString()) {
            return Logging.error("Unauthorized");
        }

        const invoiceName = "invoice-" + orderId + ".pdf";
        const invoicePath = path.join("public", "invoices", invoiceName);
        // fs.readFile(invoicePath, (err: unknown, data: Buffer) => {
        //     if (err) {
        //         return Logging.error(err);
        //     }
        // res.setHeader("content-type", "application/pdf");
        // res.setHeader(
        //     "content-disposition",
        //     'inline; attachment"' + invoiceName + '"'
        // );
        //     res.send(data);
        // });
        const file = await fs.createReadStream(invoicePath);
        res.setHeader("content-type", "application/pdf");
        res.setHeader(
            "content-disposition",
            'inline; attachment"' + invoiceName + '"'
        );
        file.pipe(res);
    }
}

export default new ShopController();
