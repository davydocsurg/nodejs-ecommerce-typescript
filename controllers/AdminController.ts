import { Product } from "../models/Product";

export const getAddProductPage = (req: any, res: any, next: any) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

export const createProduct = (req: any, res: any, next: any) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};
