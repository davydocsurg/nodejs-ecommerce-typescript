import fs from "fs";
import path from "path";
import { PRODUCTS_JSON_PATH } from "../utils/constants";
import { Product, Products } from "./Product";

// interface existingProds{};
interface updatedProds {
    qty?: string;
}

// const p = path.join(
//     path.dirname(process.mainModule?.filename),
//     "data",
//     "products.json"
// );
// const p = `${process.cwd()}/data/products.json`;

export class Cart {
    static addProduct(id: string, productPrice: number) {
        // get product details
        // console.log(id);

        Product.findById(id, (item: Product) => {
            console.log(item.id);
        });

        // fetch the previous cart
        // fs.readFile(PRODUCTS_JSON_PATH, (err: any, fileContent) => {
        //     let cart = { products: [], totalPrice: 0 };
        //     if (!err) {
        //         cart = JSON.parse(fileContent.toString());
        //     }
        //     // console.log(cart, " aaaaa");

        //     // analyze the cart => find existing product
        //     if (cart.products) {
        //         const existingProductsIndex = cart.products.findIndex(
        //             (prod) => prod["id"] === id
        //         );
        //         const existingProducts: any =
        //             cart.products[existingProductsIndex];
        //         let updatedProducts: any;
        //         console.log(existingProducts, " rrrrr");

        //         // add new product/increase quantity
        //         if (existingProducts) {
        //             updatedProducts = { ...existingProducts };
        //             updatedProducts.qty += 1;
        //             cart.products = [...cart.products];
        //             cart.products[existingProductsIndex] = updatedProducts;
        //         } else {
        //             updatedProducts = { id: id, qty: 1 };
        //             cart.products = [...cart.products, updatedProducts];
        //         }
        //         cart.totalPrice = cart.totalPrice + productPrice;
        //         fs.writeFile(
        //             PRODUCTS_JSON_PATH,
        //             JSON.stringify(cart),
        //             (err) => {
        //                 console.log(err);
        //             }
        //         );
        //     }
        // });
    }
}
