const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  const post_data = await Post.findAll({
    include: [{model: User},{model: Comment}]
  });
  res.json(post_data);
});

module.exports = router;