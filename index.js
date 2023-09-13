const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = "8080";

const server = http.createServer( (req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 
    'index.html' : req.url);
    let contentType = 'text/html';
   
    
  

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type' : 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                //Some server error
                res.writeHead(500);
                res.end(content, 'utf8');
            }
            } else {
                //Success
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf8');
            }
        
    })
  
  });

  server.listen(port, hostname, () => {
      console.log(`server runing at http://${hostname}:${port}/`)
  })