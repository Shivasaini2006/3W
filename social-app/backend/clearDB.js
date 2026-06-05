const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    await Post.deleteMany({});
    console.log('Posts cleared');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
