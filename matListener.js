var express = require('express');
var fs = require('fs');
var app = express();


var io = require('socket.io')(app.listen(3000));
io.on('connection', function(socket) {
        fs.watch('data', function(event, filename) {
            fs.readFile('data/' + filename, function(err, data) {
                if (!err) {
                    try {
                       
                        var x = JSON.parse(data);
                        socket.emit('updated', x);

                    } catch (e) {
                        console.log('malformed data');
                    }


                }
            })
        });
    });