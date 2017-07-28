const express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');

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

 var server = app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
 });

 reload(app);
