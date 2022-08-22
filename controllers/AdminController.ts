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
        console.log("not edit");
    }

    const prodId = req.params.id;

    Product.findById(prodId, (product: Object) => {
        if (!product) {
            returnToHome(res);
            console.log("no product");
        }

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
        });
    });
};

export const createProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("creating...");

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

export const updateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const updateProduct = new Product(
        prodId,
        updatedImageUrl,
        updatedPrice,
        updatedTitle,
        updatedDesc
    );
    console.log(updateProduct);

    updateProduct.save();
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
