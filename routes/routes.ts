import fs from "fs";

const bodyExt: Array<any> = [];

const requestHandler = (req: any, res: any) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
            `<body>
                <form action="/msg" method="POST">
                    <input type="text" name="text" />
                    <button type="submit"> Send </button>
                </form>
            </body>`
        );
        res.write("</html>");
        return res.end();
    }

    if (url === "/msg" && method === "POST") {
        // console.log(req);

        req.on("data", (chunk: string) => {
            // console.log("logging chunk ", chunk);
            bodyExt.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(bodyExt).toString();
            const msg = parsedBody.split("=")[1];

            fs.writeFile("message.txt", msg, (err: any) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
            // return res.end();
        });
        // res.statusCode = 302;
        // res.setHeader("Location", "/");
        // return res.end();
        // problem solved
        // thank you so much
        // anytime bro
    }
    // res.setHeader("Content-Header", "text/html");
    // res.write("<html>");
    // res.write("<head><title>My first node page</title></head>");
    // res.write("<body><h1>My first node page</h1></body>");
    // res.write("</html>");
    // res.end();
};

module.exports = requestHandler;
