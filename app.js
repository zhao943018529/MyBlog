var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer({dest:'uploads/'});

//webpack
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

//mongodb
const db = require('./mongodb/db');

var index = require('./routes/index');
var user = require('./routes/user');
const register = require('./routes/register');
const login = require('./routes/login');
const account = require('./routes/account');
const article = require('./routes/article');

//middlewares
var usermw = require('./middlewares/user');

var app = express();


  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: config.devServer.contentBase,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60000
  }
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.post('/photo/upload', upload.single('image'), function (req, res, next) {
  res.json({
    status:200,
    url:"/"+req.file.path
  });
});
app.use(usermw);
app.use('/user',user);
app.use('/article',article);
app.use('/account',account);
app.use('/login',login);
app.use('/register',register);


app.get('*',function(req,res){
	console.log(req.url);
	res.sendFile(path.join(__dirname,'dist/index.html'),{
		headers:{'Content-Type':'text/html'}
	});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
