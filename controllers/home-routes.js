const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        if (!req.session.loggedIn){
            res.render('home', {loggedIn: req.session.loggedIn});
        } else {
            res.render('home', {loggedIn: req.session.loggedIn});
        }
        
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