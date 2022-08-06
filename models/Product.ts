import fs from "fs";
import path from "path";

interface Products {
    title?: string;
    imageUrl?: string;
    description?: string;
    price?: string;
}

let products: Products[] = [
    { title: "", imageUrl: "", description: "", price: "" },

    // { title: "" },
    // { imageUrl: "" },
    // { description: "" },
    // { price: "" },
];

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
    imageUrl?: string;
    description?: string;
    price?: string;

    constructor(
        title?: string,
        imageUrl?: string,
        description?: string,
        price?: string
    ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
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
