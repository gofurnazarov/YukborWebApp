const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If the file is not found, serve index.html
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else {
            // If the file is found, serve it
            const ext = path.extname(filePath);
            let contentType = 'text/html';

            if (ext === '.js') {
                contentType = 'application/javascript';
            } else if (ext === '.css') {
                contentType = 'text/css';
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(8000, () => {
    console.log('Server listening on http://localhost:1101');
});
