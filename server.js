const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 1412;
app.listen(port, () => console.log(`Starting server at ${port}`));

app.use(express.static('public'));