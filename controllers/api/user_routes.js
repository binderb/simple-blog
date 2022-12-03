const router = require('express').Router();
const { User } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 user
router.post('/', async (req, res) => {
  try {
    const new_user_data = await User.create(req.body);
    req.session.save(() => {
      req.session.logged_in = true;
      res.status(201).json(new_user_data);
    });

  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(403).json({message: 'Username already exists! Please try a different one.'});
    } else {
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
});

// Log in user
router.post('/login', async (req, res) => {
  try {
    const user_data = await User.findOne({
      where: {username: req.body.username}
    });

    if (!user_data) {
      res.status(400).json({message: 'Invalid username or password, please try again!'});
      return;
    }

    const valid_password = await user_data.check_password(req.body.password);
    if (!valid_password) {
      res.status(400).json({message: 'Invalid username or password, please try again!'});
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json({message: 'You are now logged in!'});
    });
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Log out user
router.post('/logout', withAuthAPI, async (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});


module.exports = router;