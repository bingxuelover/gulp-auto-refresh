var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('服务启动成功!');
});

app.use(express.static('dist'));

var server = app.listen(9000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
