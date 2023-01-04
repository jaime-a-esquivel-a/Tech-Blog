const router = require('express').Router();
const { PostHeader, User } = require ('../models/');

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


module.exports = router;