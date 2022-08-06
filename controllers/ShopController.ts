import { Product } from "../models/Product";

export const getProducts = (req: any, res: any, next: any) => {
    Product.fetchAll((products: any) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
};

export const getProductsIndex = (req: any, res: any, next: any) => {
    Product.fetchAll((products: any) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
        });
    });
};

export const getCart = (req: any, res: any, next: any) => {
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
    });
};

export const getCheckout = (req: any, res: any, next: any) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Your Checkout",
    });
};
