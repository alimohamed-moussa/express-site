const express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');
var io = require('socket.io')();

const port = process.env.PORT || 3000;
app.set('appData', dataFile);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Roux Meetups';
app.locals.allSpeakers = dataFile.speakers;

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));

 var server = app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
 });

 io.attach(server);
 io.on('connection', function(socket) {
   socket.on('postMessage', function(data) {
     io.emit('updateMessages', data);
   });
 });

reload(app);
