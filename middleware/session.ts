import { mongoDbUrl } from "../utils/constants";
import session from "express-session";
import MongoDBUri from "connect-mongodb-session";
import { ConstructorDeclaration } from "typescript";
// const MongoDBUri = require("connect-mongodb-session")(session);

interface storeConnectionInt {
    uri: string;
    collection: string;
}

interface sessionMiddlewareInt {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    store: Function;
}

const storeConnection = MongoDBUri({
    uri: mongoDbUrl,
    collection: "sessions",
});

export const sessionMiddleware = session({
    secret: "lorem secretly",
    resave: false,
    saveUninitialized: false,
    store: new storeConnection(),
});
