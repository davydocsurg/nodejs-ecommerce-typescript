import { Product, Products } from "../models/Product";
import express, { Request, Response } from "express";
import { Cart } from "../models/Cart";

export const getProducts = (req: any, res: any, next: any) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("shop/product-list", {
                prods: rows,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getProduct = (req: any, res: any, next: any) => {
    const prodId = req.params.id;
    Product.findById(prodId)
        .then(([product]) => {
            res.render("shop/product-detail", {
                product: product[0],
                pageTitle: product.title ? product.title : "Product",
                path: "/products",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getProductsIndex = (req: any, res: any, next: any) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render("shop/product-list", {
                prods: rows,
                pageTitle: "All Products",
                path: "/",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getCart = (req: Request, res: Response, next: Function) => {
    Cart.getCart((cart: any) => {
        Product.fetchAll((products: any) => {
            let cartProducts = [];

            for (let product of products) {
                const cartProductData = cart.products.find(
                    (prod: any) => +prod.id === +product.id
                );
                if (
                    cart.products.find((prod: any) => +prod.id === +product.id)
                ) {
                    cartProducts.push({
                        productData: product,
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

export const removeProductFromCart = (
    req: Request,
    res: Response,
    next: Function
) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product: any) => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
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
