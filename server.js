
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

http.createServer((req, res) =>{

    console.log(`${req.method} solicita ${req.url}`);

    if(req.url == '/index.html' || req.url == '/' ){
        fs.readFile('./index.html', 'UTF-8', (err, html) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
        );
        
    }
    else if(req.url.match(/.css$/)){
        const reqPath = path.join(__dirname, req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if (req.url.match(/.js$/)) {

		const jsPath = path.join(__dirname, req.url);
		const jsStream = fs.createReadStream(jsPath,'UTF-8');

		res.writeHead(200, {"Content-Type": "text/js"});

        jsStream.pipe(res);
    }
else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }

}).listen(3000);

console.log('Servidor iniciado...');
/*
const http = require('http');
const host = '127.0.0.1';
const port = 4000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Primer servidor con Node.Js');
});
server.listen(port);
console.log('Servidor iniciado...');
*/