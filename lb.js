const http = require('http');

const hostname = '127.0.0.1';
const port = 80;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    console.log(`Received request from ${req.socket.remoteAddress}`);
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log(`Host: ${req.headers.host}`);
    console.log(`User Agent: ${req.headers['user-agent']}`);
    console.log(`Accept: ${req.headers.accept}`);
    const options = {
      hostname: hostname,
      port: 3000,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': req.headers['user-agent'],
        'Accept': req.headers['accept'],
        'Host': req.headers['host']
      }
    };
    const externalReq = http.request(options, (externalRes) => {
      let data = '';
      externalRes.on('data', (chunk) => {
        data += chunk;
      });
      externalRes.on('end', () => {
        console.log('Response from external URL:', data);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
      });
    });
    externalReq.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      res.statusCode = 500;
      res.end('Error occurred while fetching data from external URL');
    });
    externalReq.end();
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});