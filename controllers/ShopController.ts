import { Product } from "../models/Product";

export const getProducts = (req: any, res: any, next: any) => {
    Product.fetchAll((products: Object) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
};

export const getProduct = (req: any, res: any, next: any) => {
    const prodId = req.params.id;
    Product.findById(prodId, (product: any) => {
        res.render("shop/product-detail", {
            product: product,
            pageTitle: product.title ? product.title : "Product",
            path: "/products",
        });

        // res.json({
        //     res: product.title,
        // });
    });
};

export const getProductsIndex = (req: any, res: any, next: any) => {
    Product.fetchAll((products: Object) => {
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

export const postCart = (req: any, res: any, next: any) => {
    const prodId = req.body.id;
    console.log(prodId);
    res.redirect("/cart");
};

export const getOrders = (req: any, res: any, next: any) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

export const getCheckout = (req: any, res: any, next: any) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Your Checkout",
    });
};
