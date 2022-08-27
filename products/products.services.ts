import { execute } from "../utils/mysql.database";
import { ProductQueries } from "./products.queries";

export const fetchProducts = async () => {
    execute(ProductQueries.GetProducts, []);
};
