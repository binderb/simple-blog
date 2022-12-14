const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuthView } = require('../utils/auth');

// Display homepage
router.get('/', async (req, res) => {
  const post_data = await Post.findAll({
    include: [{model: User}],
    order: [['created','DESC']]
  });
  const posts = post_data.map(e => e.get({plain: true}));
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    username: req.session.username,
    active_homepage: true
  });
});

// Display single post (and comments)
router.get('/post/:id', async (req, res) => {
  try {
    const post_data = await Post.findByPk(req.params.id, {
      include: [{
        all:true,
        nested:true
      }],
      order: [  
        [ {model: Comment}, 'created', 'DESC'], 
      ],
    });
    if (!post_data) {
      res.status(404).render('404',{
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        username: req.session.username
      });
      return;
    }
    const post = post_data.get({plain: true});
    const render_obj = {
      ...post,
      context: req.query.context,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username
    }
    res.render('post', render_obj);
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Display user dashboard
router.get('/dashboard', withAuthView, async (req, res) => {
  const posts_data = await Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [
      ['created', 'DESC']
    ]
  });
  const posts = posts_data.map(e => e.get({plain:true}));
  res.render('dashboard', {
    posts,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    username: req.session.username,
    active_dashboard: true
  });
});

// Display post editor
router.get('/edit/:id', withAuthView, async (req, res) => {
  try {
    const post_data = await Post.findByPk(req.params.id);
    if (!post_data) {
      res.status(404).render('404',{
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        username: req.session.username
      });
      return;
    }
    const post = post_data.get({plain: true});
    if (req.session.user_id != post.user_id) {
      res.status(403).redirect('/');
      return;
    }
    const render_obj = {
      ...post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username
    }
    res.render('edit', render_obj);
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Display login page
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login-signup',{
    active_login: true
  });
});

// Display signup page
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