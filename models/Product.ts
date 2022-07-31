interface Products {
    title: string;
}

const products: Products[] = [{ title: "" }];

export class Product {
    title: string;
    constructor(t: string) {
        this.title = t;
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}

// export default new Product();
