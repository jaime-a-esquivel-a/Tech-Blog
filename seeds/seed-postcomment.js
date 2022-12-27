const { PostComment } = require('../models');

const PostCommentData = [
    {
        user_id: 1,
        post_id: 1,
        text: 'This is a test comment from user 1',
    },
    {
        user_id: 2,
        post_id: 1,
        text: 'This is a test comment from user 2',
    },
];

const seedPostComment = () => PostComment.bulkCreate(PostCommentData);

module.exports = seedPostComment;