var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
}

var productsRouter = require('./src/routes/form.js');

var app = express();
app.use(cors(corsOptions));

// added these 2 lines to remove the Error: View Engine not found
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));
console.log("__dirname: ", __dirname);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.options('*',cors(corsOptions));
app.use('/', productsRouter);

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(3001, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("Bhatti server listening at localhost:%s", port);
});
