const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/withAuth');

// Gets single post by ID
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                // Get comments associated with the post
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['name'],
                    }
                },
                // Gets user who authored the post
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const post = postData.get({ plain: true });
        // Uncomment once view is written
        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        // Creates a new post with passed req.body
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Deletes a post with the associated ID & user_id
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Update post by ID
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        // Updates a post with the associated name & description
        const postData = await Post.update({
            name: req.body.name,
            description: req.body.description,
        },
        // At the location with the associated ID & user_id
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID.' });
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Post comment
router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.id,
        });

        res.status(200).json(newComment);

    } catch (err) {
        res.status(404).json(err);
    }
})

module.exports = router;