function isGuest() {
    return function(req, res, next) {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function isUser() {
    return function(req, res, next) {
        if (!req.user) {
            res.status(401).json({code: 401, message: 'Please login'});
        } else {
            next();
        }
    };
}

module.exports = {
    isGuest,
    isUser
};