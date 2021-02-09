const querystring = require("querystring");
const http = require("http");

const server = http.createServer();

let activeConnections = 0;

server.on("connection", (socket) => {
    console.log(
        "Client connected, active connections: %s",
        ++activeConnections
    );

    socket.on("close", (req, socket) => {
        console.log(
            "Client diconnected, active connections: %s",
            --activeConnections
        );
    });
});

server.on("clientError", (error, socket) => {
    socket.end("HTTP/1.1 400 Bad Request \r\n\r\n");
});

server.on("request", (req, res) => {
    console.log("%s request received, headers: %s", req.method, req.headers);
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        res.setHeader("Content-Type", "application/javascript");
        res.write(JSON.stringify(querystring.decode(data)), "utf8");
        res.end();
    });
});

server.listen(8080);
