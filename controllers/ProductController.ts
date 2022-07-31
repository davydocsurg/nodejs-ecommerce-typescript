import { Product } from "../models/Product";

export const getAddProductPage = (req: any, res: any, next: any) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

export const createProduct = (req: any, res: any, next: any) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

export const getProducts = (req: any, res: any, next: any) => {
    const products = Product.fetchAll();

    res.render("shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
    });
};
