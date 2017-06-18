var http = require('http');
var fs = require('fs');

var host = '127.0.0.1'; // localhost
var port = '9000';

var servidor = http.createServer(function(call, request){

    console.log(call.method + ' -> ' + call.url);

    if(call.url == '/'){
        fs.readFile('./index.html','utf-8', function(error, content){
            request.writeHead(200, {'Content-Type' : 'text/html'});
            request.end(content);
        });
    }
    else if(call.url.match(/.css$/)){
        fs.readFile('.' + call.url,'utf-8', function(error, content){
            if(error){
                request.writeHead(404, {'Content-Type' : 'text/html'});
                request.end('<h1>404 La hoja de estilos no existe</h1>');
            }
            request.writeHead(200, {'Content-Type' : 'text/css'});
            request.end(content);
        });
    }
    else{
        request.writeHead(404, {'Content-Type' : 'text/html'});
        request.end('<h1>404 La pagina no existe</h1>');
    }

});

servidor.listen(port, host, function(){
    console.log('Server running: ' + host + ":" + port);
})