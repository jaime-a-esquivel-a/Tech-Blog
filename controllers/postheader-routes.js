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
    res.render("add-post", {
        loggedIn: req.session.loggedIn,
        userName: req.session.userName,
    });
});

router.post("/", withAuth, async (req, res) => {

    /*console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.session.userId);*/

    try{

        const postData = await PostHeader.create({
            title: req.body.title,
            description: req.body.content,
            user_id: req.session.userId,
        });
        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.post("/comment/:id", withAuth, async (req, res) => {

    /*console.log(req.body.user_id);
    console.log(req.body.post_id);
    console.log(req.body.text);*/

    try{

        const commentData = await PostComment.create({
            user_id: req.body.user_id,
            post_id: req.body.post_id,
            text: req.body.text,
        });
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete("/:id", withAuth, async (req, res) => {

    //console.log(req.body.id);

    try{
        const postData = PostHeader.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;