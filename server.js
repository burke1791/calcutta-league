require('dotenv').config();

const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const PORT = process.env.HTTP_PORT || process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/api-routes')(app);
require('./controllers/users')(app);

app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});