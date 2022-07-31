const products: Array<any> = [];

export const getAddProductPage = (req: any, res: any, next: any) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

export const createProduct = (req: any, res: any, next: any) => {
    products.push({ title: req.body.title });
    res.redirect("/");
};

export const getProducts = (req: any, res: any, next: any) => {
    res.render("shop", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
    });
};
