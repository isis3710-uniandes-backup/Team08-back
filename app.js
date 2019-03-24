var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ongRouter= require('./routes/ong');
var sponsorRouter= require('./routes/sponsor');
var solicitudRouter= require('./routes/solicitud');
var evidenceRouter= require('./routes/evidence');
var benefitRouter= require('./routes/benefit');
var transportationCompanyRouter= require('./routes/transportationCompany');
var donantesRouter = require('./routes/donantes');
var beneficiariosRouter = require('./routes/beneficiarios');
var articulosRouter = require('./routes/articulos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'front/build'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ong',ongRouter);
app.use('/sponsor',sponsorRouter);
app.use('/solicitud',solicitudRouter);
app.use('/evidence',evidenceRouter);
app.use('/transportationCompany',transportationCompanyRouter);
app.use('/benefit',benefitRouter);
app.use('/donantes',donantesRouter);
app.use('/beneficiarios',beneficiariosRouter);
app.use('/articulos',articulosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
