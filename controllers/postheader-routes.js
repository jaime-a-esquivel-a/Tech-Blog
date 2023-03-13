const router = require('express').Router();
const { PostHeader, User, PostComment } = require ('../models/');
const withAuth = require("../utils/auth.js");

router.get('/', async (req, res) => {

    try{

        const postsData = await PostHeader.findAll({
            where: {
                user_id: req.session.userId,
            },
            include: [ 
                {
                    model: User,
                } 
            ]
        });

        if (!postsData){
            res.status(404).json({message : "No posts found in database"});
            return;
        }

        //res.status(200).json(postsData);

        const posts = postsData.map((post) =>
            post.get({ plain: true })
        );
        res.render('postheader', {
            posts,
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
        });
        
    } catch (error){
        res.status(500).json(error);
    }
    
});

router.get('/new', (req, res) => {
    res.render("add-post");
});

module.exports = router;