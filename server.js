require('dotenv').config();

const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

// grab whatever port is available and default to 3001 if not deployed; port 3000 is reserved for the React dev server
const PORT = process.env.HTTP_PORT || process.env.PORT || 3001;

const app = express();

// tell express where the production React files are located and serve them to the client
// only applies when the app is in production
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require all routes
require('./controllers/users')(app);
require('./controllers/leagues')(app);
require('./controllers/auctions')(app);
require('./controllers/messages')(app);

app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});