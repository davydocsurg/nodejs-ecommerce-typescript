import { Product } from "../models/Product";
import { Request, NextFunction, Response } from "express";

export const getAddProductPage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

export const getEditProductPage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const editMode = req.query.edit;
    if (!editMode) {
        returnToHome(res);
    }

    const prodId = req.params.id;

    Product.findById(prodId, (product: Object) => {
        if (!product) {
            returnToHome(res);
        }

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product,
        });
    });
};

export const createProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    console.log(req.body);

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

export const getProducts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Product.fetchAll((products: any) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "/admin/products",
        });
    });
};

const returnToHome = (res: Response) => {
    return res.redirect("/");
};
