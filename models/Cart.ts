import fs from "fs";
import path from "path";

// interface existingProds{};
interface updatedProds {
    qty?: string;
}

const p = path.join(
    path.dirname(process.mainModule?.filename),
    "data",
    "products.json"
);

export class Cart {
    static addProduct(id: string, productPrice: any) {
        // fetch the previous cart
        fs.readFile(p, (err: any, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // analyze the cart => find existing product
            if (cart.products) {
                const existingProductsIndex = cart.products.findIndex(
                    (prod) => prod["id"] === id
                );
                const existingProducts: any =
                    cart.products[existingProductsIndex];
                let updatedProducts: any;

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
                cart.totalPrice = cart.totalPrice + productPrice;
            }
        });
    }
}
