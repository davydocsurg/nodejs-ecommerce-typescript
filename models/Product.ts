import fs from "fs";
import path from "path";
import { PRODUCTS_JSON_PATH } from "../utils/constants";

export interface Products {
    id?: string;
    title?: string;
    imageUrl?: string;
    description?: string;
    price: number;
}

let products: Products[];
// = [
//     { id: "", title: "", imageUrl: "", description: "", price: "" },

//     // { id: "" },
//     // { title: "" },
//     // { imageUrl: "" },
//     // { description: "" },
//     // { price: "" },
// ];

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     "data",
//     "products.json"
// );
// const p = `${process.cwd()}/data/products.json`;

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
        title?: string,
        imageUrl?: string,
        description?: string,
        price?: number
    ) {
        // this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();

        fetchProductsFromFile((products: any) => {
            products.push(this);
            fs.writeFile(
                PRODUCTS_JSON_PATH,
                JSON.stringify(products),
                (err) => {
                    console.log(err, "?");
                }
            );
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
}
