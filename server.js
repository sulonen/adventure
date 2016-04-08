'use strict';

let express = require('express');

const PORT = process.env.PORT || 3000;

let app = module.exports = exports = express();
app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

