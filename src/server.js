const http = require('http');
const app = require('../app');
const PORT = process.env.APP_PORT;

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`El servidor esta escuchando en localhost:${PORT}`);
});


