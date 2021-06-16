const withAuth = (req, res, next) => {
    // If logged_in is false, redirect to login page
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        // Else, move onto the next portion of the API call
        next();
    }
};

module.exports = withAuth;