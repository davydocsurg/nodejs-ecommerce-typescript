import path from "path";
import http from "http";
import express, {
    Express,
    RequestHandler,
    Request,
    Response,
    NextFunction,
    response,
} from "express";
import bodyParser from "body-parser";

// locals
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import { get404 } from "./controllers/ErrorController";

// database
import { sequelize } from "./utils/db";

// models
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/CartItem";

const port = process.env.APP_PORT || 3001;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res: Response, next: NextFunction) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.error(err);
        });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

// database relationships

// user-product
Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE",
});
User.hasMany(Product);

// user-cart
User.hasOne(Cart);
Cart.belongsTo(User);

// cart-product
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    .sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: "David", email: "david@email.com" });
        }
        return user;
    })
    .then((user) => {
        return user.createCart();
    })
    .then((user) => {
        console.log(user);

        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
