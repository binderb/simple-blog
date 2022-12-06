const router = require('express').Router();
const { User } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 user
router.post('/', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(403).json({message: 'You must supply a username and password!'});
      return;
    }

    const new_user_data = await User.create(req.body);
    await req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = new_user_data.id;
      req.session.username = new_user_data.username;
      res.status(201).json({message: 'Profile created successfully!'});
    });

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(403).json({message: 'Username already exists! Please try a different one.'});
    } else if (err.name === 'SequelizeValidationError') {
      res.status(403).json({message: 'Your password must be at least 8 characters long!'});
    } else {
      res.status(500).json({message: `Internal Server Error: ${err.name}`});
    }
  }
});

// Log in user
router.post('/login', async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(403).json({message: 'You must supply a username and password!'});
      return;
    }

    const user_data = await User.findOne({
      where: {username: req.body.username}
    });

    if (!user_data) {
      res.status(403).json({message: 'Invalid username or password, please try again!'});
      return;
    }

    const valid_password = await user_data.check_password(req.body.password);
    if (!valid_password) {
      res.status(403).json({message: 'Invalid username or password, please try again!'});
      return;
    }

    await req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = user_data.id;
      req.session.username = user_data.username;
      res.status(200).json({message: 'You are now logged in!'});
    });
  
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Log out user
router.post('/logout', withAuthAPI, async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});


module.exports = router;