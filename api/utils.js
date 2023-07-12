 
 const requireUser = ((req, res, next) => {
    console.log('req.user----------->',req.user)
    if (!req.user) {
        next({
            error: 'error',
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
});

module.exports = {
   requireUser
};