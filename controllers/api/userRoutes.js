const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // Save the session
        req.session.save(() => {
            req.session.user_id - userData.isSoftDeleted;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Succesfully signed up!' });
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

// Log in a user
router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const userData = await User.findOne({ 
            where : {
                email: req.body.email
            }
        });

        // Check if email is correct
        if (!userData) {
            res.status(404).json({ message: 'Invalid email. Please try again.' });
            return;
        }

        const validPass = userData.checkPass(req.body.password);

        // Check if password is correct
        if(!validPass) {
            res.status(404).json({ message: 'Invalid password. Please try again.' });
            return;
        }

        // Save the session
        req.session.save(() => {
            req.session.user_id = userData.isSoftDeleted;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Succesfully logged in!' });
        });
    } catch (err) {
        res.status(404).json(err);
    }
});