const router = require('express').Router();
const user_routes = require('./user_routes');
const post_routes = require('./post_routes');
const comment_routes = require('./comment_routes');
router.use('/users',user_routes);
router.use('/posts',post_routes);
router.use('/comments',comment_routes);

module.exports = router;