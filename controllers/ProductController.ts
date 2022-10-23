import Product from "../models/Product";
import { Request, NextFunction, Response } from "express";
import { deleteOne } from "./HandlerFactory";
import {
    AdminProductsPagination,
    authCheck,
    calcPrevPage,
    checkForNextPage,
    findUserById,
    getLastPage,
    getNextPage,
    getPrevPage,
} from "../helpers";
import Logging from "../helpers/logs";
import { validationResult } from "express-validator";
import { destroyFile } from "../helpers/file";
import { ITEMS_PER_PAGE } from "../utils/constants";

class ProductController {
    constructor() {
        this.getAddProductPage = this.getAddProductPage.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.getAdminProducts = this.getAdminProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.returnToHome = this.returnToHome.bind(this);
    }

    async getAddProductPage(req: Request, res: Response, next: NextFunction) {
        res.render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            errorMsg: null,
            oldValue: {
                title: "",
                description: "",
                price: "",
            },
            validationErr: [],
        });
    }

    async getAdminProducts(req: Request, res: Response, next: NextFunction) {
        const page: number | string = +req.query.page || 1;

        const pageCount = await Product.find().countDocuments();
        const products = await AdminProductsPagination(
            page,
            ITEMS_PER_PAGE,
            req
        );
        res.render("admin/products", {
            prods: products,
            pageTitle: "All Products",
            path: "/admin/products",
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            currentPage: page,
            hasNextPage: checkForNextPage(ITEMS_PER_PAGE, page, pageCount),
            hasPreviousPage: calcPrevPage(page),
            nextPage: getNextPage(page),
            previousPage: getPrevPage(page),
            lastPage: getLastPage(pageCount, ITEMS_PER_PAGE),
        });
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        const title = req.body.title;
        const price = req.body.price;
        const image = req.file;
        const description = req.body.description;
        const errors = validationResult(req);

        if (!image) {
            let errmsg = "Attached file is not an image";
            return this.createProductValidation(
                res,
                req,
                errors,
                title,
                description,
                price,
                errmsg
            );
        }

        if (!errors.isEmpty()) {
            let errmsg = errors.array().map((e: any) => e.msg);
            return this.createProductValidation(
                res,
                req,
                errors,
                title,
                description,
                price,
                errmsg
            );
        }
        const imageUrl = image.path;
        await Product.create({
            title,
            price,
            imageUrl,
            description,
            userId: req.session.user,
        });

        return this.returnToHome(res);
    }

    async getProductEditPage(req: Request, res: Response, next: NextFunction) {
        const editMode = req.query.edit;
        const prodId = req.params.id;

        if (!editMode) {
            this.returnToHome(res);
        }

        const product = await Product.findById(prodId);

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            errorMsg: null,
            oldValue: {
                title: "",
                description: "",
                price: "",
            },
            validationErr: [],
        });
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        const prodId = req.body.id;
        const updatedTitle = req.body.title;
        const updatedPrice = req.body.price;
        const image = req.file;
        const updatedDesc = req.body.description;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errmsg = errors.array().map((e: any) => e.msg);
            return res.status(422).render("admin/edit-product", {
                path: "/admin/edit-product",
                pageTitle: "Update Product",
                errorMsg: errmsg,
                isAuthenticated: authCheck(req),
                csrfToken: req.csrfToken(),
                oldValue: {
                    title: updatedTitle,
                    description: updatedDesc,
                    price: updatedPrice,
                },
                validationErr: errors.array(),
                editing: false,
            });
        }
        const updatedImage = image?.path;
        const updatedData = {
            title: updatedTitle,
            price: updatedPrice,
            description: updatedDesc,
            imageUrl: updatedImage,
        };

        const product = await Product.findById(prodId);
        if (image) {
            destroyFile(product?.imageUrl);
        }
        if (product?.userId?.toString() !== req.session.user?._id.toString()) {
            return res.redirect("/");
        }

        await Product.findByIdAndUpdate(prodId, updatedData);

        return res.redirect("/admin/products");
    }

    // form validation rules
    createProductValidation(
        res: Response,
        req: Request,
        errors: any,
        title?: string,
        description?: string,
        price?: string,
        errmsg?: string | string[]
    ) {
        return res.status(422).render("admin/edit-product", {
            path: "/admin/add-product",
            pageTitle: "Add Product",
            errorMsg: errmsg,
            isAuthenticated: authCheck(req),
            csrfToken: req.csrfToken(),
            oldValue: {
                title: title,
                description: description,
                price: price,
            },
            validationErr: errors.array(),
            editing: false,
        });
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        const id = req.body.productId;

        const product = await Product.findById(id);
        if (!product) {
            return Logging.warn("No products found");
        }

        destroyFile(product?.imageUrl);

        await deleteOne(Product, req, res, next);

        return res.redirect("/admin/products");
    }

    returnToHome(res: Response) {
        return res.redirect("/");
    }
}

export default new ProductController();
