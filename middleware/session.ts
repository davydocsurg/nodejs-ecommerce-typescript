import { mongoDbUrl } from "../utils/constants";
import session from "express-session";
import MongoStore from "connect-mongo";

// const storeConnection = MongoDBUri({
//     uri: mongoDbUrl,
//     collection: "sessions",
// });

interface Options {
    url: string;
    ttl: number;
    // autoRemove: string;
}

const options: Options = {
    url: mongoDbUrl,
    ttl: 14 * 24 * 60 * 60,
    // autoRemove: "native",
};

export const sessionMiddleware = session({
    secret: "lorem secretly",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(options),
});
