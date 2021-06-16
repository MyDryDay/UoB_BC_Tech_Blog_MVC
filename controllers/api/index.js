const router = require('express').Router();
const postRoutes = require('./postRoutes');
// Require userRoutes once complete

router.use('/posts', postRoutes);
// Use /users & userRoutes once complete

module.exports = router;