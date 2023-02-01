const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const cors = require('cors');
const app = express();
const posts = require('./ruotes/getJson');

mongoose
  .connect('mongodb://127.0.0.1:27017/lastTest')
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('not connected');
  });

app.use(express.json());
app.use(cors());
app.use('/api/posts', posts);

const port = 3001;

app.listen(port, () => `express running`);
