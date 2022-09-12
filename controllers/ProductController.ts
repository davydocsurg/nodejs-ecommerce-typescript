import Product from "../models/Product";
import { Request, NextFunction, Response } from "express";
import { deleteOne } from "./HandlerFactory";

class ProductController {
    constructor() {
        this.getAddProductPage = this.getAddProductPage.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.getAdminProducts = this.getAdminProducts.bind(this);
        this.returnToHome = this.returnToHome.bind(this);
    }

    async getAddProductPage(req: Request, res: Response, next: NextFunction) {
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

    async getProductEditPage(req: Request, res: Response, next: NextFunction) {
        const editMode = req.query.edit;
        const prodId = req.params.id;

        if (!editMode) {
            this.returnToHome(res);
            console.log("not edit");
        }

        const product = await Product.findById(prodId);

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
        });
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const prodId = req.body.id;
        const updatedTitle = req.body.title;
        const updatedPrice = req.body.price;
        const updatedImageUrl = req.body.imageUrl;
        const updatedDesc = req.body.description;

        const updatedData = {
            title: updatedTitle,
            price: updatedPrice,
            imageUrl: updatedImageUrl,
            description: updatedDesc,
        };

        await Product.findByIdAndUpdate(prodId, updatedData);

        res.redirect("/admin/products");
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        await deleteOne(Product, req, res, next);

        res.redirect("/admin/products");
    }

    async returnToHome(res: Response) {
        return res.redirect("/");
    }
}

export default new ProductController();