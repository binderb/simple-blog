const router = require('express').Router();
const { Comment } = require('../../models');
const { withAuthAPI } = require('../../utils/auth');

// Create 1 comment
router.post('/', withAuthAPI, async (req, res) => {
  try {
    const new_comment_data = await Comment.create(req.body);
    res.status(201).json(new_comment_data);
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error'});
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