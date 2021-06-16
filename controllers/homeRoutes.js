const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

// Retrieve all posts & associated comments
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                // Get all comments on post
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                // Get user that authored the post
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so templating engine can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Uncomment & include view name once written
        // res.render('homepage', { 
        //     posts, 
        //     logged_in: req.session.logged_in 
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieve post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                // Get all comments on post
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                // Get user that authored post
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        // Uncomment & include view name once written
        // res.render('post', {
        //     ...post,
        //     logged_in: req.session.logged_in
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieves user
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            // Exclude value for password
            attributes: { exclude: ['password'] },
            // Include all of the user's associated posts
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });
        // Uncomment & include view name once written
        // res.render('profile', {
        //     ...user,
        //     logged_in: true
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieves signup page
router.get('/signup', (req, res) => {
    // If logged in the redirect to profile/dashboard
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
  
    // Uncomment & include view name once written
    // res.render('signup');
});

// Retrieves login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to profile/dashboard
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
  
    // Uncomment & include view name once written
    // res.render('login');
  });


router.get('posts/edit/:id', withAuth, async (req, res) => {
    try {
        const editPost = await Post.findByPk(req.params.id, {
            // Include user that authored the post
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        if (!editPost) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }

        const edit = editPost.get({ plain: true })
        // Uncomment & include view name once written
        // res.render('edit', {
        //     edit,
        //     logged_in: req.session.logged_in
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

  module.exports = router;