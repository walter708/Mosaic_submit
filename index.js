const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use(bodyParser.json());

app.listen(process.env.PORT || port, () => {
  console.log('Listening on port '+ (port));
})