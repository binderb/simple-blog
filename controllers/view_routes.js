const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuthView } = require('../utils/auth');

router.get('/', async (req, res) => {
  const post_data = await Post.findAll({
    include: [{model: User}],
    order: [['created','DESC']]
  });
  const posts = post_data.map(e => e.get({plain: true}));
  console.log(req.session);
  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    username: req.session.username,
    active_homepage: true
  });
});

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
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username
    }
    res.render('post', render_obj);
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

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