const { PostHeader } = require('../models');

const PostHeaderData = [
    {
        user_id: 1,
        title: 'FIRST POST HEADER',
        description: 'Test Post header',
    },
    {
        user_id: 2,
        title: 'SECOND POST HEADER',
        description: 'Test Post header',
    },
];

const seedPostHeaders = () => PostHeader.bulkCreate(PostHeaderData);

module.exports = seedPostHeaders;