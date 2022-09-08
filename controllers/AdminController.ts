import Product from "../models/Product";
import { Request, NextFunction, Response } from "express";

class ProductController {
    constructor() {
        this.getAddProductPage = this.getAddProductPage.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.getAdminProducts = this.getAdminProducts.bind(this);
        this.returnToHome = this.returnToHome.bind(this);
    }

    async getAddProductPage(req: Request, res: Response, next: NextFunction) {
        console.log("ejnkfnknf");

        res.render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
        });
    }

    async getAdminProducts(req: Request, res: Response, next: NextFunction) {
        const products = await Product.find();
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "/admin/products",
        });
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        const title = req.body.title;
        const price = req.body.price;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;

        let product = await Product.create({
            title,
            price,
            imageUrl,
            description,
        });
        console.log(product);

        this.returnToHome(res);
    }

    async returnToHome(res: Response) {
        return res.redirect("/");
    }
}

export default new ProductController();
