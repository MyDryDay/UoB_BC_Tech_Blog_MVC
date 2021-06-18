const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Associations for Users and Posts
// A User may have many Posts, a Post only belongs to one User
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Associations for Users and Comments
// A User may have many Comments, a Comment only belongs to one User
User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Associations for Posts and Comments
// A Post may have many Comments, a Comment only belongs to one Post
Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };