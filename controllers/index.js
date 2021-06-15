const router = require('express').Router();

// Require files for the api & homeRoutes routes
const apiRoutes = require('./api');
const homeRoutes = require('homeRoutes');

// Set which routes should be used for which files
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;