const http = require("http");
const { hostname } = require("os");
const url = require("url");

const PORT = 80;
const TARGET_SERVER = "http://example.com";

const server = http.createServer((req, res) => {
  console.log(`Received request from ${req?.connection?.remoteAddress}`);
  console.log(`${req?.method} ${req.url}`);
  console.log(req.headers);

  const options = {
    hostname: url.parse(TARGET_SERVER).hostname,
    port: 80,
    path: req?.url,
    method: req?.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true,
    });
  });

  req.pipe(proxy, {
    end: true,
  });

  proxy.on("error", (err) => {
    console.log(`Error with proxy request: ${err.message}`);
    res.writeHead(500);
    res.end("Internal Server Error");
  });
});

server.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
});
