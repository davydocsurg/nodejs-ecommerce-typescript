import fs from "fs";
import { PRODUCTS_JSON_PATH } from "../utils/constants";

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
        id?: string,
        title?: string,
        price?: number,
        imageUrl?: string,
        description?: string
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    save() {
        fetchProductsFromFile((products: any) => {
            if (this.id) {
                const existingProductsIndex = products.findIndex(
                    (prod: any) => prod.id === this.id
                );

                const updatedProducts = [...products];
                updatedProducts[existingProductsIndex] = this;
                fs.writeFile(
                    PRODUCTS_JSON_PATH,
                    JSON.stringify(updatedProducts),
                    (err) => {
                        console.error(err);
                    }
                );
            } else {
                this.id = Math.random().toString();
                console.log(this);

                products.push(this);
                fs.writeFile(
                    PRODUCTS_JSON_PATH,
                    JSON.stringify(products),
                    (err) => {
                        console.log(err, "?");
                    }
                );
            }
        });
    }

    static fetchAll(cb: Function) {
        fetchProductsFromFile(cb);
    }

    static findById(id: string, cb: Function) {
        fetchProductsFromFile((products: Array<Products>) => {
            const product = products.find((product) => product.id == id.trim());
            cb(product);
        });
    }

    static deleteById(id: string, cb: Function) {
        fetchProductsFromFile((products: Array<Products>) => {
            const updatedProduct = products.filter(
                (prod) => prod.id !== id.trim()
            );

            cb(product);
        });
    }
}
