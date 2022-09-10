import Product from "../models/Product";
import { NextFunction, Request, Response } from "express";
import { getOne } from "./HandlerFactory";

class ShopController {
    constructor() {
        this.getAllProducts = this.getAllProducts.bind(this);
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find();
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
}

export default new ShopController();
