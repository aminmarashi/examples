const querystring = require("querystring");
const http = require("http");

const requestData = {
    hello: "😋",
    data: "hi",
};

const payload = querystring.stringify(requestData);

console.log("Data sent to the server: %s", requestData);

const req = http.request(
    "http://localhost:8080/",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(payload),
        },
    },
    (res) => {
        res.setEncoding("utf8");
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            console.log("Data back from the server: %s", JSON.parse(data));
        });
    }
);

req.write(payload);
req.end();
