var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);				// enables real-time bidirectional event-based communication.
var monk = require("monk"); 						// a framework that makes accessing MongoDb
var should = require("should"); 					// keeps your test code clean, and your error messages helpful.
var SerialPort = require("serialport").SerialPort;  // access serial ports for reading and writing
var dateFormat = require('dateformat');

/*var serialPort = new SerialPort("COM3", {
    baudrate: 115200,
    parser: require("serialport").parsers.readline("\n")
});*/

app.use(express.static('public'));

var db = monk('localhost/WaspMote');
should.exists(db);
var collection = db.get("Acceleration");
should.exists(collection);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(8080, function(){
    console.log('Listening ' + 8080);
});


// Web Socket
io.on('connection', function(socket)
{
    console.log('Bir kullanıcı bağlandı');

    socket.on('disconnect', function()
    {
        console.log('Kullanıcı ayrıldı...');
    });
});

/*
// Serial Port Operations
serialPort.on("open", function ()
{
    // Seri porttan okuma
    serialPort.on('data', function(data)
    {
        console.log(data);
        var date = new Date();
        var dataArray = data.split(':');
        console.log(dateFormat(date.getTime(), "yyyy-mm-dd HH:MM:ss") + '-->x :' + dataArray[0] + 'y :' + dataArray[1] + 'z :' + dataArray[2]);
		
        // Tüm istemcilere gönder
        io.emit('acceleration', data);

        // MongoDB'ye kaydet
        collection.insert({"time":dateFormat(date.getTime(), "yyyy-mm-dd HH:MM:ss"), "x": dataArray[0],"y": dataArray[1],"z": dataArray[2] }, function(err, doc)
        {
            if(err)
            {
                console.log("HATA");
            }
        });
    });


});

*/