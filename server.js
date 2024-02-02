// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const NewsItem = require('./models/newsItem');
const User = require('./models/user');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session and store it in MongoDB
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/hackernews',
  collection: 'sessions',
});

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Set up routes
app.use('/', routes);

// Listen on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
