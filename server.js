var express = require('express');

var app = express();
app.use(express.static(__dirname)).listen(8245);
console.log('Listening on port 8245');
