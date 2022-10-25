import Product from "../models/Product";
import { NextFunction, Request, Response } from "express";
import { getOne } from "./HandlerFactory";
import Order from "../models/Order";
import { OrderType } from "../interfaces/order";
import {
    authCheck,
    calcPrevPage,
    checkForNextPage,
    getLastPage,
    getNextPage,
    getPrevPage,
    getUserProducts,
    ProductsPagination,
} from "../helpers";
import fs from "fs";
import path from "path";
import Logging from "../helpers/logs";
import PDFDocument from "pdfkit";
import { ITEMS_PER_PAGE, stripeAPIKey } from "../utils/constants";
import Stripe from "stripe";

class ShopController {
    constructor() {
        this.getIndex = this.getIndex.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.addProdToCart = this.addProdToCart.bind(this);
        this.deleteItemFromCart = this.deleteItemFromCart.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.getCheckout = this.getCheckout.bind(this);
    }

    async getIndex(req: Request, res: Response, next: NextFunction) {
        const page: number | string = +req.query.page || 1;

        const pageCount = await Product.find().countDocuments();

        const products = await ProductsPagination(page, ITEMS_PER_PAGE);

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            currentPage: page,
            hasNextPage: checkForNextPage(ITEMS_PER_PAGE, page, pageCount),
            hasPreviousPage: calcPrevPage(page),
            nextPage: getNextPage(page),
            previousPage: getPrevPage(page),
            lastPage: getLastPage(pageCount, ITEMS_PER_PAGE),
        });
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const page: number | string = +req.query.page || 1;

        const pageCount = await Product.find().countDocuments();

        const products = await ProductsPagination(page, ITEMS_PER_PAGE);

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            currentPage: page,
            hasNextPage: checkForNextPage(ITEMS_PER_PAGE, page, pageCount),
            hasPreviousPage: calcPrevPage(page),
            nextPage: getNextPage(page),
            previousPage: getPrevPage(page),
            lastPage: getLastPage(pageCount, ITEMS_PER_PAGE),
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
        await req.user.addToCart(product);

        return res.redirect("/checkout");
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

        const pdfDoc = new PDFDocument();
        res.setHeader("content-type", "application/pdf");
        res.setHeader(
            "content-disposition",
            'inline; attachment"' + invoiceName + '"'
        );
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);

        pdfDoc.fontSize(25).text("Invoice");
        let totalPrice = 0;
        order.products.forEach((prod) => {
            totalPrice += prod.quantity * prod.product.price;
            pdfDoc
                .fontSize(14)
                .text(
                    prod.product.title +
                        ": " +
                        prod.quantity +
                        " * " +
                        "$" +
                        prod.product.price
                );
        });

        pdfDoc.fontSize(20).text("Total Price $" + totalPrice);

        pdfDoc.end();

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
        // const file = await fs.createReadStream(invoicePath);

        // file.pipe(res);
    }

    async getCheckout(req: Request, res: Response, next: NextFunction) {
        const products = await getUserProducts(req);
        let total = 0;
        await products.forEach((p: any) => {
            // Logging.info(p);
            total += p.quantity + p.product.price;
        });

        return res.render("shop/checkout", {
            path: "/checkout",
            pageTitle: "Checkout",
            products: products,
            total: total,
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
        });
    }

    async checkout(req: Request, res: Response, next: NextFunction) {
        const products = await getUserProducts(req);
        const token = req.body.stripeToken;
        let total = 0;
        let productTitle: string = "";
        await products.forEach((p: any) => {
            productTitle = p.product.title;
            total += p.quantity + p.product.price;
        });

        const stripe = new Stripe(stripeAPIKey, {
            apiVersion: "2022-08-01",
        });

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: productTitle,
                        },
                        unit_amount: total * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3001/checkout",
            cancel_url: "http://localhost:3001/checkout",
        });

        // return res.redirect("/checkout");
        return res.redirect(session.url);
    }
}

export default new ShopController();
