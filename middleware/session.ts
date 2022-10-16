import { localDB, mongoDbUrl } from "../utils/constants";
import session from "express-session";
import MongoStore from "connect-mongo";
import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";

const options: ConnectMongoOptions = {
    mongoUrl: localDB,
    ttl: 14 * 24 * 60 * 60,
    collectionName: "sessions",
    stringify: false,
    // autoRemove: "interval",
    // autoRemoveInterval: 1,
    // autoRemove: "native",
};

export const sessionMiddleware = session({
    secret: "lorem secretly",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create(options),
});
