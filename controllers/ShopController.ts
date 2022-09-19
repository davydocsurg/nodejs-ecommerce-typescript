import Product from "../models/Product";
import { NextFunction, Request, Response } from "express";
import { getOne } from "./HandlerFactory";
import mongoose from "mongoose";

class ShopController {
    constructor() {
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.addProdToCart = this.addProdToCart.bind(this);
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find().populate("userId");

        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        const product = await getOne(Product, req, res, next);
        // console.log(query);

        res.render("shop/product-detail", {
            product: product,
            pageTitle: product?.title ? product?.title : "Product",
            path: "/products",
        });
    }

    async addProdToCart(req: Request, res: Response, next: NextFunction) {
        // const prodId = req.body.id;
        // console.log(prodId);

        const product = await getOne(Product, req, res, next);

        return req.user.addToCart(product);
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        const cartProds = await req.user.populate("cart.items.productId");
        // .execPopulate();
        const prods = cartProds.cart.items;

        res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: prods,
        });
    }
}

export default new ShopController();
