const express = require('express');
const models = require('./Models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./Services/Auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./Schema/Schema');
const cors = require('cors');
require('dotenv').config()

const app = express();

const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());

// enable cors
const corsOptions = {
  origin: process.env.CLIENT_DOMAIN,
  credentials: true // <-- REQUIRED backend setting
};

app.use('/graphql', cors(corsOptions), expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;
