const router = require('express').Router();
const User = require('../../models/User');

//GET all users
router.get('/', async (req, res) => {
    try{

        const usersData = await User.findAll({});

        if (!usersData){

            res.status(404).json({message : "No users found in database"});

        }

        res.status(200).json(usersData);

    }

    catch (error){

        res.status(500).json(error);

    }

});

//GET user by e-mail
router.get('/:email', async (req, res) => {
    try {

        const userData = await User.findOne({

            where: {
                email : req.params.email,
            }

        });

        if (!userData) {

            res.status(404).json({message : "No user was found with that email in database"});
            return;

        }

        res.status(200).json(userData);

    } catch (error) {

        res.status(500).json(error);

    }

});

//POST to create user
router.post('/', async (req, res) => {

    try {

        const newUser = await User.create({

            user_name : req.body.user_name,
            email: req.body.email,
            password: req.body.password,

        });

        res.status(200).json(newUser);

    } catch (error) {

        res.status(500).json(error);

    }

});

//PUT to update user by email
router.put('/:email', async (req, res) => {

    try {

        const updateUser = await User.update(req.body, {

            where: {

                email: req.params.email,

            },

        });

        if (!updateUser[0]) {

            res.status(404).json({message : "No user was found with that email in database"});
            return;

        }

        res.status(200).json(updateUser);

    } catch (error) {

        res.status(500).json(error);

    }

});

//DELETE to delete user by email
router.delete('/:email', async (req, res) => {

    try {
        const deleteUser = await User.destroy({

            where : {

                email : req.params.email,

            },

        });

        if (!deleteUser) {

            res.status(404).json({ message: 'No user was found with that email in database' });
            return;

        }

        res.status(200).json(deleteUser); 

    } catch (error) {

        res.status(500).json(error);

    }

});

//POST for login session by email
router.post('/login', async (req, res) => {

    try {

        const dbUserData = await User.findOne({

            where: {

                email: req.body.email,

            },

        });
    
        if (!dbUserData) {

            res
            .status(400)
            .json({ message: 'No user was found with that email' });
            return;

        }

        console.log(dbUserData);
        const validPassword = await dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {

            res
            .status(400)
            .json({ message: 'Incorrect password. Please try again!' });
            return;

        }
    
        req.session.save(() => {

            req.session.loggedIn = true;
            req.session.userName = dbUserData.user_name;
            res
            .status(200)
            .json({ user: dbUserData, message: 'You are now logged in!' });

        });

      } catch (err) {

        console.log(err);
        res.status(500).json(err);

      }

});

//POST for logout session
router.post('/logout', async (req, res) => {

    if (req.session.loggedIn) {

        res
        .status(200)
        .json({ message: 'You are now logged out!' });

        req.session.destroy(() => {

          res.status(204).end();

        });

      } else {

        res.status(404).end();

      }
});

module.exports = router;