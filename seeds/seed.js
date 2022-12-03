const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const user_seeds = require('./user_seeds.json');
const post_seeds = require('./post_seeds.json');
const comment_seeds = require('./comment_seeds.json');

const seed_database = async () => {
  await sequelize.sync({force: true});
  await User.bulkCreate(user_seeds, {
    individualHooks: true,
    returning: true
  });
  await Post.bulkCreate(post_seeds);
  await Comment.bulkCreate(comment_seeds);
  process.exit(0);
}

seed_database();