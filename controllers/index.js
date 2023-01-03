const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
//const postHeaderRoutes = require('./postheader-routes.js');
//const postCommentRoutes = require('./postcomment-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//router.use('/post', postHeaderRoutes);
//router.use('/comment', postCommentRoutes);

module.exports = router;