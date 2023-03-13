const router = require('express').Router();
const { PostHeader, User, PostComment } = require ('../models/');

router.get('/', async (req, res) => {

    try {

        /*if (!req.session.loggedIn){
            res.render('home', {loggedIn: req.session.loggedIn});
        } else {
            res.render('home', {loggedIn: req.session.loggedIn});
        }*/

        const postsData = await PostHeader.findAll({
            include: [ {model: User} ]
        });

        if (!postsData){
            res.status(404).json({message : "No materials found in database"});
            return;
        }
        const posts = postsData.map((post) =>
            post.get({ plain: true })
        );
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
        });
        
    } catch (err) {
        res.status(500).json(err);  
    }
    
});

router.get('/login', async (req, res) => {

    res.render('login');

});

router.get('/signup', async (req, res) => {

    res.render('signup');

});

router.get('/post/:id', async (req, res) => {

    try{

        const postData = await PostHeader.findOne({
            where: {
                id: req.params.id,
            },
            include: [ 
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: PostComment,
                    attributes: ['text', 'deleted', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['user_name'],
                    }
                },
            ] 
        });

        //res.status(200).json(postData);

        const arrPost = [];
        arrPost.push(postData);

        const posts = arrPost.map((post) =>
            post.get({ plain: true })
        );

        res.render('post', {
            posts,
            loggedIn: req.session.loggedIn,
            userName: req.session.userName,
        });

    }catch (error){
        res.status(500).json(error);
    }

});

module.exports = router;