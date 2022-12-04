const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  const post_data = await Post.findAll({
    include: [{model: User},{model: Comment}]
  });
  const posts = post_data.map(e => e.get({plain: true}));
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in,
    active_homepage: true
  });
});

module.exports = router;