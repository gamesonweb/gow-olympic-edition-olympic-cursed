const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Traitez ici les requêtes HTTP
    const filePath = path.join(__dirname, req.url);
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('error', () => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    });

    fileStream.pipe(res);
});

const port = 3000;
server.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
