const router = require('express').Router();
const { DataTypes } = require('sequelize');
const { Comment, Post } = require('../../models');
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
    const update_result = await Comment.update(req.body, {
      where: {id: req.params.id}
    });

    if (update_result[0] == 0) {
      res.status(404).json({message: 'Comment with given ID not found!'});
      return;
    }

    res.status(200).json({message: 'Comment updated successfully'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Delete 1 comment
router.delete('/:id', withAuthAPI, async (req, res) => {
  try {
    const delete_result = await Comment.destroy({
      where: {id: req.params.id}
    });

    if (delete_result) {
      res.status(404).json({message: 'Comment with given ID not found!'});
      return;
    }

    res.status(200).json({message: 'Comment deleted successfully'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = router;