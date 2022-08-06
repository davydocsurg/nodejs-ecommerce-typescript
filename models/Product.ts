import fs from "fs";
import path from "path";

interface Products {
    id?: string;
    title?: string;
    imageUrl?: string;
    description?: string;
    price?: string;
}

let products: Products[] = [
    { id: "", title: "", imageUrl: "", description: "", price: "" },

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
    id?: string;
    title?: string;
    imageUrl?: string;
    description?: string;
    price?: string;

    constructor(
        id?: string,
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
        this.id = Math.random().toString();
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

    static findById(id: string, cb: Function) {
        fetchProductsFromFile((products: any) => {
            const product = products.find((p: any) => p.id === id);
            cb(product);
        });
    }
}

// export default new Product();
