const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 comment
router.post('/', withAuthAPI, async (req, res) => {
  try {
    if (!req.body.content) {
      res.status(403).json({message: 'Your comment cannot be empty!'});
      return;
    } else if (!req.body.post_id) {
      res.status(400).json({message: 'No post id specified.'});
      return;
    }
    const post_data = await Post.findByPk(req.body.post_id);
    if (!post_data) {
      res.status(404).json({message: 'Post does not exist.'});
      return;
    }
    const new_comment_body = {
      ...req.body,
      user_id: req.session.user_id
    }
    const new_comment_data = await Comment.create(new_comment_body);
    res.status(201).json(new_comment_data);
  } catch (err) {
    res.status(500).json({message: `Internal Server Error: ${err.name}`});
  }
});

// Update 1 comment
router.put('/:id', withAuthAPI, async (req, res) => {
  try {
    // Make sure user is the author of the comment
    const comment_data = await Comment.findByPk(req.params.id, {
      include: [{model: User}]
    });
    if (!comment_data) {
      res.status(404).json({message: 'Comment with given ID not found!'});
      return;
    }
    const comment = comment_data.get({plain:true});
    if (req.session.user_id != comment.user.id) {
      res.status(401).json({message: 'Your user id does not match the author of the comment you are trying to edit.'});
      return;
    }
    const updated_comment_body = {
      ...req.body,
      updated: new Date()
    }
    await Comment.update(updated_comment_body, {
      where: {id: req.params.id}
    });

    res.status(200).json({message: 'Comment updated successfully.'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Delete 1 comment
router.delete('/:id', withAuthAPI, async (req, res) => {
  try {
    // Make sure user is the author of the comment
    const comment_data = await Comment.findByPk(req.params.id, {
      include: [{model: User}]
    });
    if (!comment_data) {
      res.status(404).json({message: 'Comment with given ID not found!'});
      return;
    }
    const comment = comment_data.get({plain:true});
    if (req.session.user_id != comment.user.id) {
      res.status(401).json({message: 'Your user id does not match the author of the comment you are trying to delete.'});
      return;
    }

    await Comment.destroy({
      where: {id: req.params.id}
    });

    res.status(200).json({message: 'Comment deleted successfully.'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = router;