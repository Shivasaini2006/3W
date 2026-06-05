const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text && !image) return res.status(400).json({ error: 'Text or image is required' });

    const newPost = new Post({
      userId: req.user._id,
      username: req.user.username,
      text,
      image
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Like/Unlike a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const likeIndex = post.likes.findIndex(like => like.userId.toString() === req.user._id);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // Unlike
    } else {
      post.likes.push({ userId: req.user._id, username: req.user.username }); // Like
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment on a post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ username: req.user.username, text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
