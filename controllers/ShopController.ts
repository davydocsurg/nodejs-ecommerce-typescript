import { Product } from "../models/Product";

export const getProducts = (req: any, res: any, next: any) => {
    Product.fetchAll((products: any) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        });
    });
};
