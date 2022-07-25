const http = require("http");

// customs
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3001);
