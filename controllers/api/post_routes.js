const router = require('express').Router();
const { Post } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 post
router.post('/', withAuthAPI, async (req, res) => {
  try {
    const new_post_data = await Post.create(req.body);
    res.status(201).json(new_post_data);
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Update 1 post
router.put('/:id', withAuthAPI, async (req, res) => {
  try {
    const update_result = await Post.update(req.body, {
      where: {id: req.params.id}
    });

    if (update_result[0] == 0) {
      res.status(404).json({message: 'Post with given ID not found!'});
      return;
    }

    res.status(200).json({message: 'Post updated successfully'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Delete 1 post
router.delete('/:id', withAuthAPI, async (req, res) => {
  try {
    const delete_result = await Post.destroy({
      where: {id: req.params.id}
    });

    if (delete_result) {
      res.status(404).json({message: 'Post with given ID not found!'});
      return;
    }

    res.status(200).json({message: 'Post deleted successfully'});
  
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = router;