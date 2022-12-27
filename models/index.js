const User = require('./User');
const PostHeader = require('./PostHeader');
const PostComment = require('./PostComment');

// definitions for User & PostHeader

User.hasMany(PostHeader, {
    foreignKey: 'user_id',
});

PostHeader.belongsTo(User, {
    foreignKey: 'user_id',
});

// definitions for PostHeader & PostComment

PostHeader.hasMany(PostComment, {
    foreignKey: 'post_id',
});

PostComment.belongsTo(PostHeader, {
    foreignKey: 'post_id',
});

// definitions for User & PostComment

User.hasMany(PostComment, {
    foreignKey: 'user_id',
});

PostComment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = {User, PostHeader,PostComment};
