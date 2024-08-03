const http = require('http')

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain')
  console.log(`Received request from ${req.socket.remoteAddress}`)
  console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`)
  console.log(`Host: ${req.headers.host}`)
  console.log(`User Agent: ${req.headers['user-agent']}`)
  console.log(`Accept: ${req.headers.accept}`)
  res.end('Hello From 2nd Backend Server\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
