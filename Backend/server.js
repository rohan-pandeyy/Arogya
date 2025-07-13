const http = require('http');
const app = require('./app');
const port = process.env.PORT || 80;

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
