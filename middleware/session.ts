import { mongoDbUrl } from "../utils/constants";
const session = require("express-session");
const mongoDBUri = require("connect-mongodb-session")(session);

const store = new mongoDBUri({
    uri: mongoDBUri,
    collection: "sessions",
});

export const sessionMiddleware: Function = session({
    secret: "lorem secretly",
    resave: false,
    saveUninitialized: false,
    store: store,
});
