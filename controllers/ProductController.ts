import { Product } from "../models/Product";

export const getAddProductPage = (req: any, res: any, next: any) => {
    res.render("admin/ add-product", {
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
    Product.fetchAll((products: any) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        });
    });
};
