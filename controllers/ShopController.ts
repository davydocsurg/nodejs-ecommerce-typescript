import { Product, Products } from "../models/Product";
import express, { Request, Response } from "express";
import { Cart } from "../models/Cart";

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

export const getCart = (req: Request, res: Response, next: Function) => {
    Cart.getCart((cart: any) => {
        Product.fetchAll((products: [Object]) => {
            const cartProducts = [];

            for (p of products) {
                const cartProductData = cart.products.find(
                    (prod: any) => prod.id === p.id
                );
                if (cart.products.find((prod: any) => prod.id === p.id)) {
                    cartProducts.push({
                        productData: p,
                        qty: cartProductData.qty,
                    });
                }
            }

            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: cartProducts,
            });
        });
    });
};

export const postCart = (req: any, res: any, next: any) => {
    const prodId = req.body.id;
    Product.findById(prodId, (product: Products) => {
        return Cart.addProduct(prodId, product.price);
    });
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
