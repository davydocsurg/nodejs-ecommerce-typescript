import fs from "fs";
import path from "path";

interface Products {
    title?: string;
}

let products: Products[] = [{ title: "" }];

const p = path.join(
    path.dirname(process.mainModule?.filename),
    "data",
    "products.json"
);

const fetchProductsFromFile = (cb: Function) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

export class Product {
    title?: string;
    constructor(t?: string) {
        this.title = t;
    }

    save() {
        // products.push(this);
        fetchProductsFromFile((products: [any]) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err, "?");
            });
        });
    }

    static fetchAll(cb: Function) {
        fetchProductsFromFile(cb);
    }
}

// export default new Product();
