const withAuth = (req, res,next) => {
  if (!req.session.loggedIn) {
    // redirects user to login if not alread
    res.redirect("/login");
  } else {
    // proceed to next middleware or route if the user is logged in
    next();
  }
};

module.exports = withAuth;
