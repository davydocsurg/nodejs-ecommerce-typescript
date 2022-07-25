const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write(
            `<body>
                <form action="/msg" method="POST">
                    <input type="text" />
                    <button type="submit"> Send </button>
                </form>
            </body>`
        );
        res.write("</html>");
        return res.end();
    }

    if (url === "/msg" && method === "POST") {
        const body: string[] = [];
        req.on("data", (chunk: string) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const msg = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", msg);
        });
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
    }

    res.setHeader("Content-Header", "text/html");
    res.write("<html>");
    res.write("<head><title>My first node page</title></head>");
    res.write("<body><h1>My first node page</h1></body>");
    res.write("</html>");
    res.end();
});

server.listen(3001);
