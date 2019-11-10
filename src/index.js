const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const keys = require('../config/keys');
const router = require('./router');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());
app.use(morgan('combined'));


// attempts to parse any request into JSON
app.use(bodyParser.json({ type: '*/*' }));

router(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets if they exist
  app.use(express.static('client/build'));

  // Express will serve index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(5000, () => console.log('Listening on port 5000'));
