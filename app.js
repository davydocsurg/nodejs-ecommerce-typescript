"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const csurf_1 = __importDefault(require("csurf"));
const multer_1 = __importDefault(require("multer"));
// locals
const shop_1 = __importDefault(require("./routes/shop"));
const admin_1 = __importDefault(require("./routes/admin"));
const ErrorController_1 = require("./controllers/ErrorController");
const db_1 = require("./utils/db");
const auth_1 = __importDefault(require("./routes/auth"));
const session_1 = require("./middleware/session");
const helpers_1 = require("./helpers");
const helpers_2 = require("./helpers");
const mailServices_1 = __importDefault(require("./services/mailServices"));
const fileUpload_1 = require("./helpers/fileUpload");
const port = process.env.APP_PORT || 3001;
const app = (0, express_1.default)();
const csrfProtection = (0, csurf_1.default)();
app.set("view engine", "ejs");
app.use(session_1.sessionMiddleware);
app.use((req, res, next) => {
    (0, helpers_1.findUserById)(req, next);
});
// app.use((req: Request, res: Response, next: NextFunction) => {
//     console.log("app.ts", req.session.user._id);
//     User.findById(req.session.user._id)
//         .then((user) => {
//             // console.log(user);
//             req.user = user;
//             next();
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// });
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ storage: fileUpload_1.fileStorage, fileFilter: fileUpload_1.fileValidation }).single("image"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// serve images
app.use("/public/products/images", express_1.default.static(path_1.default.join(__dirname, "public/products/images")));
app.use(csrfProtection);
app.use("/admin", admin_1.default);
app.use(shop_1.default);
app.use(auth_1.default);
app.use(ErrorController_1.get404);
app.use((0, connect_flash_1.default)());
app.use(helpers_1.authCheck);
app.use((req, res, next) => {
    (0, helpers_2.csrfSetup)(req, res, next);
});
app.listen(port, () => {
    mailServices_1.default.createConnection();
    (0, db_1.mongoDBConnection)();
});
