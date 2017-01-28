var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

/* GET index page on server start/restart */
app.get('/', function(req, res, next) {
  res.render('index');
});

/* GET index page from any page. */
app.get('/index', function(req, res, next) {
  res.render('index');
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log('ready port');
});

module.exports = app;
