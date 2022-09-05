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

    Product.findByPk(prodId)
        .then((product) => {
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
        })
        .catch((err) => {});
};

export const createProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });

    returnToHome(res);
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

    Product.findByPk(prodId)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDesc;

            return product?.save();
        })
        .then((result) => {
            console.log("UPDATED PRODUCT!");
        })
        .catch((err) => {
            console.error(err);
        });

    // returnToHome(res);
    res.redirect("/admin/products");
};

export const getProducts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Product.findAll()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "All Products",
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

const returnToHome = (res: Response) => {
    return res.redirect("/");
};

export const deleteProduct = (req: Request, res: Response, next: Function) => {
    const prodId = req.body.productId;
    const productPrice = req.body.price;
    console.log(productPrice, "from controller");

    Product.findByPk(prodId)
        .then((product) => {
            return product?.destroy();
        })
        .then((result) => {
            console.log("product destroyed!");
        })
        .catch((err) => {
            console.error(err);
        });

    res.redirect("/admin/products");
};
