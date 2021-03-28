const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Add Authentication here once written

// To retrieve all blog posts & comments
router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        // Uncomment & include view name once written
        // res.render('homepage', { 
        //     posts, 
        //     logged_in: req.session.logged_in 
        // });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieves user
router.get('/user', async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}],
        });

        const user = userData.get({plain: true});
        // Uncomment & include view name once written
        // res.render('profile', {
        //     ...user,
        //     logged_in: true
        // });
    }
})

