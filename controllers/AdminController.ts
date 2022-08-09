import { Product } from "../models/Product";

export const getAddProductPage = (req: any, res: any, next: any) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

export const createProduct = (req: any, res: any, next: any) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    console.log(req.body);

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

export const getProducts = (req: any, res: any, next: any) => {
    Product.fetchAll((products: any) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "/admin/products",
        });
    });
};
