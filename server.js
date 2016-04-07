'use strict';

let express = require('express');
let morgan = require('morgan');

const PORT = process.env.PORT || 3000;

let app = module.exports = exports = express();
app.use(morgan('dev'));
app.use(express.static('./public'));

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

