import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import CustomerService from './services/CustomerService';
import { registerRoutes } from './controllers';

require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'mono-bank'});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connection to mongodb Successful")
  new CustomerService().populateCustomers();
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Internal server error!')
})
registerRoutes(app)


module.exports = app;
