var config = require('./config');
var http = require('http');
var server = http.createServer();
var namiLib = require("nami");
//var logger = require("log4js");


console.log("------------_>"+config.ami_host)
var namiConfig = {
    host: config.ami_host,
    port: config.ami_port,
    username: config.ami_username,
    secret: config.ami_secret,
    loglevel: config.ami_loglevel
};


var nami = new namiLib.Nami(namiConfig);
//nami.on('namiEvent', function (event) { });
//nami.on('namiEventDial', function (event) { });
//nami.on('namiEventVarSet', function (event) { });
//nami.on('namiEventHangup', function (event) { });
//

process.on('SIGINT', function () {
    nami.close();
    process.exit();
});



//Me fijo si se conecto
nami.on('namiConnected',function (event){
	console.log("nami conectado a la central");
});


// Muestra todo los los eventos
/*
nami.on('namiConnected', function (event) {
    nami.send(new namiLib.Actions.CoreShowChannelsAction(), function(response){
        logger.debug(' ---- Response: ' + util.inspect(response));
    });
});
*/

nami.on('namiEventDialBegin', function (event){
	console.log("--------------------- Dial");
	console.log(event);
});

nami.on('namiEventHangup', function (event){
	console.log("--------------------- Hangup");
	console.log(event);
	console.log(event.calleridnum);
});


nami.open();

//Esto es lo que ve el usuario al entrar al puerto donde el servidor escucha
function control(petic, resp) {
	resp.writeHead(200, {'content-type': 'text/plain'});
	resp.write('Hola, Mundo!');
	resp.end();
	console.log("Entraron a la pagina")
}

server.on('request', control);
server.listen(config.node);