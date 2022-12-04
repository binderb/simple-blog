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

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login-signup',{
    active_login: true
  });
});

router.get('/signup', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login-signup', {
    
    active_signup: true
  });
});

module.exports = router;