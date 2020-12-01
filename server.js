const express = require('express');
const app = express();

const server = app.listen(1412);
console.log('Starting server at 1412');
app.use(express.static('public'));