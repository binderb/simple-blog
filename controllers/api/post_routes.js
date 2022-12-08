const router = require('express').Router();
const { Post, User } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 post
router.post('/', withAuthAPI, async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(403).json({message: 'Your title cannot be empty!'});
      return;
    } else if (!req.body.content) {
      res.status(403).json({message: 'Your post content cannot be empty!'});
      return;
    }
    const new_post_body = {
      ...req.body,
      user_id: req.session.user_id
    }
    const new_post_data = await Post.create(new_post_body);
    res.status(201).json(new_post_data);
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Update 1 post
router.put('/:id', withAuthAPI, async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(403).json({message: 'Your title cannot be empty!'});
      return;
    } else if (!req.body.content) {
      res.status(403).json({message: 'Your post content cannot be empty!'});
      return;
    }
    // Make sure user is the author of the post
    const post_data = await Post.findByPk(req.params.id);
    if (!post_data) {
      res.status(404).json({message: 'Post with given ID not found!'});
      return;
    }
    const post = post_data.get({plain:true});
    if (req.session.user_id != post.user_id) {
      res.status(403).json({message: 'Your user id does not match the author of the post you are trying to update.'});
      return;
    }
    const updated_post_body = {
      ...req.body,
      updated: new Date()
    }
    await Post.update(updated_post_body, {
      where: {id: req.params.id}
    });
    res.status(200).json({message: 'Post updated successfully'});
  
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Delete 1 post
router.delete('/:id', withAuthAPI, async (req, res) => {
  try {
    // Make sure user is the author of the post
    const post_data = await Post.findByPk(req.params.id);
    if (!post_data) {
      res.status(404).json({message: 'Post with given ID not found!'});
      return;
    }
    const post = post_data.get({plain:true});
    if (req.session.user_id != post.user_id) {
      res.status(403).json({message: 'Your user id does not match the author of the post you are trying to delete.'});
      return;
    }

    await Post.destroy({
      where: {id: req.params.id}
    });

    res.status(200).json({message: 'Post deleted successfully.'});
  
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

module.exports = router;