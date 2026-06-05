const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const posts = await Post.find();
  console.log("Posts:");
  for (let p of posts) {
    console.log("Post ID:", p._id);
    console.log("Likes:", JSON.stringify(p.likes, null, 2));
  }
  process.exit();
}).catch(console.error);
