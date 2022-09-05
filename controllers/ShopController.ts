import { Product, Products } from "../models/Product";
import express, { NextFunction, Request, Response } from "express";
import { Cart } from "../models/Cart";
import { ObjectFlags } from "typescript";

export const getProducts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Product.findAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
    const prodId = req.params.id;
    Product.findByPk(prodId)
        .then((product) => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title ? product.title : "Product",
                path: "/products",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getProductsIndex = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Product.findAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/",
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getCart = (req: Request, res: Response, next: Function) => {
    req.user
        .getCart()
        .then((cart: any) => {
            return cart
                .getProducts()
                .then((cartProducts: Response) => {
                    res.render("shop/cart", {
                        path: "/cart",
                        pageTitle: "Your Cart",
                        products: cartProducts,
                    });
                })
                .catch((err: Error) => {
                    console.error(err);
                });
        })
        .catch((err: Error) => {
            console.error(err);
        });

    // Cart.getCart((cart: any) => {
    //     Product.fetchAll((products: any) => {
    //         let cartProducts = [];

    //         for (let product of products) {
    //             const cartProductData = cart.products.find(
    //                 (prod: any) => +prod.id === +product.id
    //             );
    //             if (
    //                 cart.products.find((prod: any) => +prod.id === +product.id)
    //             ) {
    //                 cartProducts.push({
    //                     productData: product,
    //                     qty: cartProductData.qty,
    //                 });
    //             }
    //         }

    // res.render("shop/cart", {
    //     path: "/cart",
    //     pageTitle: "Your Cart",
    //     products: cartProducts,
    // });
    //     });
    // });
};

export const postCart = (req: Request, res: Response, next: NextFunction) => {
    const prodId = req.body.id;
    let fetchedCart: any;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart: any) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products: Array<Object>) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }

            return Product.findByPk(prodId);
        })
        .then((product: Object) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            });
        })
        .then((result: Response) => {
            res.redirect("/cart");
        })
        .catch((err: Error) => {
            console.error(err);
        });
    res.redirect("/cart");
};

export const removeProductFromCart = (
    req: Request,
    res: Response,
    next: Function
) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then((cart: any) => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products: Array<Object>) => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err: Error) => {
            console.error(err);
        });
};

export const getOrders = (req: Request, res: Response, next: NextFunction) => {
    req.user
        .getOrders({ include: ["products"] })
        .then((orders: Object[]) => {
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders,
            });
        })
        .catch((err: Error) => {
            console.error(err);
        });
};

export const postOrder = (req: Request, res: Response, next: NextFunction) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart: any) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products: Array<Object>) => {
            return req.user
                .createOrder()
                .then((order: any) => {
                    return order.addProducts(
                        products.map((prod: any) => {
                            prod.orderItem = {
                                quantity: prod.cartItem.quantity,
                            };
                            return prod;
                        })
                    );
                })
                .catch((err: Error) => {
                    console.error(err);
                });
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(() => {
            res.redirect("/orders");
        })
        .catch((err: Error) => {
            console.error(err);
        });
};

export const getCheckout = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Your Checkout",
    });
};
