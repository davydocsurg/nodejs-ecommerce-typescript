import fs from "fs";
import path from "path";
import { CART_JSON_PATH, PRODUCTS_JSON_PATH } from "../utils/constants";
import { Product, Products } from "./Product";

// interface existingProds{};
interface updatedProds {
    qty?: string;
}

export interface CartType {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

export class Cart {
    static addProduct(id: string, productPrice: number) {
        // get product details
        Product.findById(id, (item: Product) => {
            console.log(item.id);
        });

        // fetch the previous cart
        fs.readFile(CART_JSON_PATH, (err: any, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }

            // analyze the cart => find existing product
            if (cart.products) {
                const existingProductsIndex = cart.products.findIndex(
                    (prod) => prod["id"] === id
                );
                const existingProducts: any =
                    cart.products[existingProductsIndex];
                let updatedProducts: any;
                console.log(existingProducts, " rrrrr");

                // add new product/increase quantity
                if (existingProducts) {
                    updatedProducts = { ...existingProducts };
                    updatedProducts.qty += 1;
                    cart.products = [...cart.products];
                    cart.products[existingProductsIndex] = updatedProducts;
                } else {
                    updatedProducts = { id: id, qty: 1 };
                    cart.products = [...cart.products, updatedProducts];
                }
                this.calcTotalPrice(cart, +productPrice);

                fs.writeFile(CART_JSON_PATH, JSON.stringify(cart), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static calcTotalPrice(cart: any, productPrice: number) {
        let totalPrice = (cart.totalPrice += productPrice);
        return totalPrice;
    }

    static deleteProduct(id: string, productPrice: number) {
        console.log(id, productPrice);

        fs.readFile(PRODUCTS_JSON_PATH, (err: any, fileContent) => {
            if (err) {
                return;
            }

            const updatedCart = { ...fileContent };
            console.log(updatedCart, "updates");

            const product = updatedCart.products.find(
                (prod: any) => prod.id === id
            );
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                (prod: any) => prod.id !== id
            );
            updatedCart.totalPrice =
                updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(
                PRODUCTS_JSON_PATH,
                JSON.stringify(updatedCart),
                (err) => {
                    console.log(err);
                }
            );
        });
    }
}
