import fs from "fs";
import {
    createProduct,
    fetchProducts,
    fetchProductById,
    PRODUCTS_JSON_PATH,
} from "../utils/constants";
import { Cart } from "./Cart";
const db = require("../utils/db");

export interface Products {
    id?: string;
    title?: string;
    imageUrl?: string;
    description?: string;
    price: number;
}

// let products: Products[];

const fetchProductsFromFile = (cb: Function) => {
    //console.log(p);

    fs.readFile(PRODUCTS_JSON_PATH, "utf8", (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        let data = JSON.parse(fileContent.toString());
        // return data;
        cb(data);
    });
};

export class Product {
    id?: string;
    title?: string;
    imageUrl?: string;
    description?: string;
    price?: number;

    constructor(
        // id?: string,
        title?: string,
        price?: number,
        imageUrl?: string,
        description?: string
    ) {
        // this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    save() {
        return db.execute(createProduct, [
            this.title,
            this.price,
            this.imageUrl,
            this.description,
        ]);
    }

    static fetchAll() {
        return db.execute(fetchProducts);
    }

    static findById(id: any) {
        return db.execute(fetchProductById, [id]);
    }

    static deleteById(id: string) {
        fetchProductsFromFile((products: Array<Products>) => {
            const product = products.find((prod) => prod.id === id);
            const updatedProducts = products.filter((prod) => prod.id !== id);
            console.log("from deleteById");

            fs.writeFile(
                PRODUCTS_JSON_PATH,
                JSON.stringify(updatedProducts),
                (err) => {
                    if (!err) {
                        Cart.deleteProduct(id, product?.price);
                    }
                    console.error(err);
                }
            );
        });
    }
}
