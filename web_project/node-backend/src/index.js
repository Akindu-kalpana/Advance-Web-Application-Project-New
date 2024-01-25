// src/index.js
const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use('/api', controllers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
